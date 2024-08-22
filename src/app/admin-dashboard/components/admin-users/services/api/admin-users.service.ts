import { Injectable } from '@angular/core';
import { ApiService } from '../../../../../shared/base-logic/api/api.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../../../core/config/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService extends ApiService<any>{

  constructor(
    http: HttpClient  
  ) {
    super(API_ENDPOINTS.users.api, http);
  }

}
