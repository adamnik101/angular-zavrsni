import { Injectable, signal } from '@angular/core';
import { ApiService } from '../../../../shared/base-logic/api/api.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../config/api-endpoints';
import { IArtist } from '../../../interfaces/artist/i-artist';

@Injectable({
  providedIn: 'root'
})
export class UserArtistFollowingsService extends ApiService<any>{

  constructor(
    http: HttpClient
  ) { 
    super(API_ENDPOINTS.user.artists, http);
  }

  public artists = signal<IArtist[]>([]);

  setArtists(artists: IArtist[]): void {
    this.artists.set(artists);
  }
}
