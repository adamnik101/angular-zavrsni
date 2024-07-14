import { Injectable } from '@angular/core';
import { ApiService } from '../../../../shared/base-logic/api/api.service';
import { IApiResponse } from '../../../../shared/interfaces/i-api-response';
import { IPlaylist } from '../../../interfaces/playlist/i-playlist';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../config/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService extends ApiService<IApiResponse<IPlaylist>>{

  constructor(
    http: HttpClient
  ) { 
    super(API_ENDPOINTS.playlist.api, http);
  }
  
}
