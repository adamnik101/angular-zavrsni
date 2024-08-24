import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { TracksService } from '../../../../../core/services/tracks/base/tracks.service';
import { AlbumsService } from '../../../../../core/services/albums/base/albums.service';
import { ArtistsService } from '../../../../../core/services/artists/base/artists.service';

@Injectable({
  providedIn: 'root'
})
export class TrackRequestsService {

  constructor(
    private apiService: TracksService,
    private albumsService: AlbumsService,
    private artistsService: ArtistsService
  ) { }

  getDataFromRequestsById(id: string | null = null): Observable<any> {
    let requests: {
      albums: any,
      artists: any,
      track?: any;
    } = {
      albums: this.getAlbums(),
      artists: this.getArtists()
    };

    if(id !== null) {
      requests['track'] = this.getTrack(id);
    }

    return forkJoin(requests);
  }

  getTrack(id: string): Observable<any> {
    return this.apiService.get(id);
  }

  getArtists(): Observable<any> {
    return this.artistsService.getAll();
  }

  getAlbums(): Observable<any> {
    return this.albumsService.getAll();
  }
}
