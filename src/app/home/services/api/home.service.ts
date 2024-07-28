import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../core/config/api-endpoints';
import { ApiService } from '../../../shared/base-logic/api/api.service';
import { forkJoin, Observable } from 'rxjs';
import { TracksNewReleasesService } from '../../../core/services/tracks/tracks-new-releases/tracks-new-releases.service';
import { AlbumsNewReleasesService } from '../../../core/services/albums/albums-new-releases/albums-new-releases.service';
import { GenreService } from '../../../core/services/genre/base/genre.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends ApiService<any>{

  constructor(
    http: HttpClient,
    private tracksNewReleasesService: TracksNewReleasesService,
    private albumsNewReleasesService: AlbumsNewReleasesService,
    private genreService: GenreService
  ) {
    super(API_ENDPOINTS.home.api, http);
  }

  getNewReleases(): Observable<any> {
    return forkJoin({
      albums: this.albumsNewReleasesService.getAll(),
      tracks: this.tracksNewReleasesService.getAll(),
      genres: this.genreService.getAll()
    });
  }
}
