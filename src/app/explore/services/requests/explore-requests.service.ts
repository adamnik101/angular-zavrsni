import { Injectable } from '@angular/core';
import { GenreService } from '../../../core/services/genre/base/genre.service';
import { forkJoin, Observable } from 'rxjs';
import { IApiResponse } from '../../../shared/interfaces/i-api-response';
import { IGenre } from '../../../core/interfaces/genre/i-genre';

@Injectable({
  providedIn: 'root'
})
export class ExploreRequestsService {

  constructor(
    private genreService: GenreService
  ) { }

  getGenres(): Observable<IApiResponse<IGenre[]>> {
    return this.genreService.getAll();
  }

  getAllData(): Observable<any> {
    const requests = [
      this.getGenres()
    ];

    return forkJoin({
      genres: requests[0]
    })
  }
}
