import { useMemo } from 'react';
import { container } from 'tsyringe';

export const useService = <T extends { new(...args: any[]): any; }>(
  Service: T
): T[keyof T] => useMemo(() => container.resolve(Service), []);
