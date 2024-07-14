import { Injectable, signal } from '@angular/core';
import { ApiService } from '../../../../shared/base-logic/api/api.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../config/api-endpoints';
import { ITrack } from '../../../interfaces/tracks/i-track';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../../shared/interfaces/i-api-response';

@Injectable({
  providedIn: 'root'
})
export class LikedTracksService extends ApiService<any>{

  constructor(
    http: HttpClient
  ) { 
    super(API_ENDPOINTS.user.tracks, http);
  }

  public likedTracks = signal<ITrack[]>([]);

  setLikedTracks(tracks: ITrack[]): void {
    this.likedTracks.set(tracks);
  }

  addToLiked(id: string): Observable<IApiResponse<any>> {
    return this.post({uuid: id});
  }

  removeFromLiked(id: string): Observable<IApiResponse<any>> {
    return this.delete(id);
  }
}
