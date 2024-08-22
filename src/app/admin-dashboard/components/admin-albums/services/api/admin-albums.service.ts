import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../../../../../core/config/api-endpoints';
import { ApiService } from '../../../../../shared/base-logic/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAlbumsService extends ApiService<any>{

  constructor(
    http: HttpClient  
  ) {
    super(API_ENDPOINTS.albums.api, http);
  }

}