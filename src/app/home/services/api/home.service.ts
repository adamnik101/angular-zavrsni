import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../core/config/api-endpoints';
import { ApiService } from '../../../shared/base-logic/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends ApiService<any>{

  constructor(http: HttpClient) {
    super(API_ENDPOINTS.home.api, http);
  }

}
