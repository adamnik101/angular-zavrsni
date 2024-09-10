import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { TracksService } from '../../../../../core/services/tracks/base/tracks.service';
import { AlbumsService } from '../../../../../core/services/albums/base/albums.service';
import { ArtistsService } from '../../../../../core/services/artists/base/artists.service';
import { API_ENDPOINTS } from '../../../../../core/config/api-endpoints';
import { GenreService } from '../../../../../core/services/genre/base/genre.service';

@Injectable({
  providedIn: 'root'
})
export class TrackRequestsService {

  constructor(
    private apiService: TracksService,
    private albumsService: AlbumsService,
    private artistsService: ArtistsService,
    private genreService: GenreService
  ) { }

  getDataFromRequestsById(id: string | null = null): Observable<any> {
    let requests: {
      albums: any,
      artists: any,
      track?: any;
      genres: any;
    } = {
      albums: this.getAlbums(),
      artists: this.getArtists(),
      genres: this.getGenres()
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
    return this.artistsService.getWithOverideEndpoint(API_ENDPOINTS.admin.artists);
  }

  getAlbums(): Observable<any> {
    return this.albumsService.getWithOverideEndpoint(API_ENDPOINTS.admin.albums);
  }

  getGenres(): Observable<any> {
    return this.genreService.getAll();
  }

  submitUpdate(id: string, dataToSend: any): Observable<any> {
    return this.apiService.postAsPatch(id, dataToSend);
  }

  submitInsert(dataToSend: any): Observable<any> {
    return this.apiService.post(dataToSend);
  }
}
