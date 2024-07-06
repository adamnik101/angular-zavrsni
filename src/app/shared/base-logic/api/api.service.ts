import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

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

  getAll(): Observable<T> {
    return this.http.get<T>(`${this.baseUrl + this.endpoint}`);
  }

  get(id: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl + this.endpoint}/${id}`);
  }

  getWithOverideEndpoint(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl + endpoint}`);
  }

  post(body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl + this.endpoint}`, body);
  }
}
