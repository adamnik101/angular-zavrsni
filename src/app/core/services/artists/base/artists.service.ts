import { Injectable } from '@angular/core';
import { ApiService } from '../../../../shared/base-logic/api/api.service';
import { IArtist } from '../../../interfaces/artist/i-artist';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../config/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService extends ApiService<IArtist>{

  constructor(
    http: HttpClient
  ) { 
    super(API_ENDPOINTS.artists.api, http);
  }
}
