import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HttpOptions } from './httpOptions';
import { BaseHttpClient } from './baseHttpClient';

@Injectable({ providedIn: 'root' })
export class NatvieBaseHttpClientImpl implements BaseHttpClient {
  protected readonly baseUrl = environment.baseApiUrl;
  protected readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public get<T>(path: string, options?: HttpOptions): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${path}`, { ...options });
  }

  public post<R, T>(
    path: string,
    body: R,
    options: HttpOptions
  ): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${path}`, body, { ...options });
  }

  public put<R, T>(path: string, body: R, options: HttpOptions): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${path}`, body, { ...options });
  }

  public patch<R, T>(
    path: string,
    body: R,
    options: HttpOptions
  ): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${path}`, body, { ...options });
  }

  public delete<T = void>(path: string, options?: HttpOptions): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${path}`, { ...options });
  }
}
