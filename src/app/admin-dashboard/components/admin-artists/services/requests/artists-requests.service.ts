import { Injectable } from '@angular/core';
import { ArtistsService } from '../../../../../core/services/artists/base/artists.service';
import { IArtist } from '../../../../../core/interfaces/artist/i-artist';
import { forkJoin, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistsRequestsService {

  constructor(
    private apiService: ArtistsService
  ) { }

  getDataFromRequestsById(id: string | null = null): any {
    let request: {
      artist?: Observable<IArtist>
    } = {
     
    };


    if(id !== null) {
      request['artist'] = this.getArtistById(id);
    }

    if(!Object.keys(request).length) {
      return of({});
    }
    
    return forkJoin(request);
  }

  getArtistById(id: string): Observable<any> {
    return this.apiService.get(id);
  }

  submitUpdate(id: string, dataToSend: any): Observable<any> {
    return this.apiService.postAsPatch(id, dataToSend);
  }

  submitInsert(dataToSend: any): Observable<any> {
    return this.apiService.post(dataToSend);
  }
}
