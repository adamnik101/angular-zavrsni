import { Injectable } from '@angular/core';
import { ApiService } from '../../../../../shared/base-logic/api/api.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../../../core/config/api-endpoints';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../../../shared/interfaces/i-api-response';

@Injectable({
  providedIn: 'root'
})
export class AdminGenresService extends ApiService<any>{

  constructor(
    http: HttpClient  
  ) {
    super(API_ENDPOINTS.genre.api, http);
  }

  override getAll<T>(params?: any): Observable<IApiResponse<T>> {
    return this.getWithOverideEndpoint(API_ENDPOINTS.admin.genres + `?${params ? params.join("&"): ""}`);
  }
}