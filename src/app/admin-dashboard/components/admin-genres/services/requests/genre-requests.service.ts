import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { GenreService } from '../../../../../core/services/genre/base/genre.service';

@Injectable({
  providedIn: 'root'
})
export class GenreRequestsService {

  constructor(
    private apiService: GenreService
  ) { }

  getDataFromRequestsById(id: string | null): Observable<any> {
    let requests: {
      genre?: any
    } = {

    };

    if(id !== null) {
      requests['genre'] = this.getGenreById(id);
    }

    if(!Object.keys(requests).length) return of({});

    return forkJoin(requests);
  }

  getGenreById(id: string): Observable<any> {
    return this.apiService.get(id);
  }

  submitInsert(dataToSend: any): Observable<any> {
    return this.apiService.post(dataToSend);
  }

  submitUpdate(id: string, dataToSend: any): Observable<any> {
    return this.apiService.postAsPatch(id, dataToSend);
  }
}
