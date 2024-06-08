import { useEffect, useState } from 'react';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { container } from 'tsyringe';

type Class<T> = new (...args: unknown[]) => T;
type ExtractGeneric<Type> = Type extends BehaviorSubject<infer X> ? X : null;

export const useStore = <
  T extends Record<L, BehaviorSubject<any>>,
  L extends keyof T,
  M extends ExtractGeneric<T[L]>,
>(
  Service: Class<T>,
  propertyNames: L[],
  defaultValues?: {
    [K in L]: ExtractGeneric<T[K]>;
  },
):
  | {
    [K in L]: ExtractGeneric<T[K]>;
  }
  | Record<string, never> => {
  const modifiedDefaultValues = defaultValues
    || ({} as {
      [K in L]: ExtractGeneric<T[K]>;
    });
  const service = container.resolve(Service);

  propertyNames.forEach((propertyName) => {
    if (service[propertyName]?.value !== undefined) {
      modifiedDefaultValues[propertyName] = service[propertyName]
        .value as ExtractGeneric<T[L]>;
    }
  });

  const [containerData, setContainerData] = useState<{
    [K in L]: ExtractGeneric<T[K]>;
  }>(modifiedDefaultValues);

  useEffect(() => {
    const unsubscriber = new Subject<void>();

    propertyNames.forEach((propertyName) => {
      service[propertyName]
        .pipe(
          takeUntil(unsubscriber) as any,
          tap((data: M) => {
            setContainerData((oldData) => ({
              ...oldData,
              [propertyName]: data,
            }));
          }),
        )
        .subscribe();
    });

    return () => {
      unsubscriber.next();
      unsubscriber.complete();
    };
  }, []);

  return containerData || {};
};
