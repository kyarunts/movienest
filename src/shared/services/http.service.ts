import { inject, singleton } from "tsyringe";
import { StorageKey, StorageService } from "./storage.service";
import { Observable, from } from "rxjs";
import { TTokenData } from "../types/global.types";

export type HttpError = {
  status: number;
  statusText: string;
  body?: {
    message: string;
  };
};

@singleton()
export class HttpService {
  constructor(@inject(StorageService) private storage: StorageService) {}

  private async fetchWithDetails<T>(
    url: string,
    options: RequestInit,
  ): Promise<T> {
    const response = await fetch(url, options);
    const responseBody = await response.text();

    if (!response.ok) {
      const error: HttpError = {
        status: response.status,
        statusText: response.statusText,
        body: responseBody ? JSON.parse(responseBody) : undefined,
      };
      return Promise.reject(error);
    }

    return responseBody ? JSON.parse(responseBody) : (null as T);
  }

  private makeRequest<T>(
    method: string,
    url: string,
    body?: any,
    skipAuth?: boolean,
  ): Observable<T> {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    if (!skipAuth) {
      const tokens = this.storage.get<TTokenData>(StorageKey.TOKEN_DATA);
      (options?.headers as Record<string, string>)["Authorization"] =
        `Bearer ${tokens?.accessToken}`;
    }

    if (method === "GET" || method === "DELETE") {
      delete options.body;
    }

    return from(
      this.fetchWithDetails<T>(
        `${import.meta.env.VITE_API_URL}/${url}`,
        options,
      ),
    );
  }

  public get<T>(
    url: string,
    searchParams?: URLSearchParams,
    skipAuth?: boolean,
  ): Observable<T> {
    const urlWithParams =
      searchParams && searchParams?.size > 0 ? `${url}?${searchParams}` : url;
    return this.makeRequest<T>("GET", urlWithParams, undefined, skipAuth);
  }

  public post<T>(url: string, body: any, skipAuth?: boolean): Observable<T> {
    return this.makeRequest<T>("POST", url, body, skipAuth);
  }

  public put<T>(url: string, body: any, skipAuth?: boolean): Observable<T> {
    return this.makeRequest<T>("PUT", url, body, skipAuth);
  }

  public delete<T>(url: string, skipAuth?: boolean): Observable<T> {
    return this.makeRequest<T>("DELETE", url, undefined, skipAuth);
  }
}
