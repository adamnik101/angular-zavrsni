import { Injectable } from '@angular/core';
import { ArtistsService } from '../../../../../core/services/artists/base/artists.service';
import { forkJoin, Observable } from 'rxjs';
import { AlbumsService } from '../../../../../core/services/albums/base/albums.service';
import { API_ENDPOINTS } from '../../../../../core/config/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class AlbumFormRequestsService {

  constructor(
    private artistsService: ArtistsService,
    private apiService: AlbumsService
  ) { }

  getDataFromRequestsById(id: string | null = null): any {
    let request: {
      artists: any;
      album?: any;
    } = {
      artists: this.getArtists()
    };


    if(id !== null) {
      request['album'] = this.getAlbumById(id);
    }

    return forkJoin(request);
  }

  getAlbumById(id: string): Observable<any> {
    return this.apiService.get(id);
  }

  getArtists(): Observable<any> {
    return this.artistsService.getWithOverideEndpoint(API_ENDPOINTS.admin.artists);
  }

  submitUpdate(id: string, dataToSend: any): Observable<any> {
    return this.apiService.postAsPatch(id, dataToSend);
  }

  submitInsert(dataToSend: any): Observable<any> {
    return this.apiService.post(dataToSend);
  }
}
