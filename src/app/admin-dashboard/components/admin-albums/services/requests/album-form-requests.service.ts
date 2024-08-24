import { Injectable } from '@angular/core';
import { ArtistsService } from '../../../../../core/services/artists/base/artists.service';
import { forkJoin, Observable } from 'rxjs';
import { IArtist } from '../../../../../core/interfaces/artist/i-artist';
import { AlbumsService } from '../../../../../core/services/albums/base/albums.service';
import { IApiResponse } from '../../../../../shared/interfaces/i-api-response';
import { IAlbum } from '../../../../../core/interfaces/album/i-album';

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
    return this.artistsService.getAll<IArtist[]>();
  }
}
