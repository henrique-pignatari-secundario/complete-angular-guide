import { Observable } from 'rxjs';
import { HttpOptions } from './httpOptions';
import { InjectionToken } from '@angular/core';

export interface BaseHttpClient {
  get<T>(path: string, options?: HttpOptions): Observable<T>;
  post<R, T>(path: string, body?: R, options?: HttpOptions): Observable<T>;
  put<R, T>(path: string, body?: R, options?: HttpOptions): Observable<T>;
  patch<R, T>(path: string, body?: R, options?: HttpOptions): Observable<T>;
  delete<T = void>(path: string, options?: HttpOptions): Observable<T>;
}

export const BASE_HTTP_CLIENT_TOKEN = new InjectionToken<BaseHttpClient>(
  'BaseHttpClient'
);
