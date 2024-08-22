import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IApiResponse } from '../../interfaces/i-api-response';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService<T> {

  constructor(
    protected endpoint: string,
    protected http: HttpClient
  ) {
    this.baseUrl = environment.baseUrl;
  }

  private baseUrl: string = "";

  getAll<T>(): Observable<IApiResponse<T>> {
    return this.http.get<IApiResponse<T>>(`${this.baseUrl + this.endpoint}`);
  }

  get<T>(id: string): Observable<IApiResponse<T>> {
    return this.http.get<IApiResponse<T>>(`${this.baseUrl + this.endpoint}/${id}`);
  }

  getWithQueryParams<T>(params: any[]): Observable<IApiResponse<T>> {
    return this.http.get<IApiResponse<T>>(`${this.baseUrl + this.endpoint}?${params.join("&")}`)
  }

  getWithOverideEndpoint<T>(endpoint: string): Observable<IApiResponse<T>> {
    return this.http.get<IApiResponse<T>>(`${this.baseUrl + endpoint}`);
  }

  post<T>(body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl + this.endpoint}`, body);
  }

  postAsPatch<T>(id: string, body: any): Observable<IApiResponse<T>> {
    return this.http.post<IApiResponse<T>>(`${this.baseUrl + this.endpoint}/${id}?_method=patch`, body);
  }

  patch<T>(id: string, body: any): Observable<IApiResponse<T>> {
    return this.http.patch<IApiResponse<T>>(`${this.baseUrl + this.endpoint}/${id}`, body);
  }

  delete<T>(id: string): Observable<IApiResponse<T>> {
    return this.http.delete<IApiResponse<T>>(`${this.baseUrl + this.endpoint}/${id}`);
  }
}
