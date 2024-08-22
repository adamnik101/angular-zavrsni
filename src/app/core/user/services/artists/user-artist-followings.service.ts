import { Injectable, signal } from '@angular/core';
import { ApiService } from '../../../../shared/base-logic/api/api.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../config/api-endpoints';
import { IArtist } from '../../../interfaces/artist/i-artist';
import { Observable } from 'rxjs';

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

  getFollowings(): Observable<any> {
    return this.getAll();
  }

  setArtists(artists: IArtist[]): void {
    this.artists.set(artists);
  }

  followArtist(uuid: string): Observable<any> {
    return this.post({uuid});
  }

  unfollowArtist(uuid: string): Observable<any> {
    return this.delete(uuid);
  }
}
