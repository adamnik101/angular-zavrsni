import { Injectable } from '@angular/core';
import { ApiService } from '../../../../../shared/base-logic/api/api.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../../../core/config/api-endpoints';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../../../shared/interfaces/i-api-response';

@Injectable({
  providedIn: 'root'
})
export class AdminTracksService extends ApiService<any>{

  constructor(
    http: HttpClient  
  ) {
    super(API_ENDPOINTS.tracks.api, http);
  }
  
}