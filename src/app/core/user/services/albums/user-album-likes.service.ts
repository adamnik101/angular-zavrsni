import { Injectable, signal } from '@angular/core';
import { ApiService } from '../../../../shared/base-logic/api/api.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../config/api-endpoints';
import { IAlbum } from '../../../interfaces/album/i-album';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAlbumLikesService extends ApiService<any>{

  constructor(http: HttpClient) {
    super(API_ENDPOINTS.user.albums, http);
  }

  public albums = signal<IAlbum[]>([]);

  getAlbums(): void {
    this.getAll<IAlbum[]>().subscribe({
      next: (response) => {
        this.setAlbums(response.data)
      }
    });
  }
  
  setAlbums(albums: IAlbum[]): void {
    this.albums.set(albums);
  }

  saveAlbum(uuid: string): Observable<any> {
    return this.post({uuid});
  }

  removeFromSaved(uuid: string): Observable<any> {
    return this.delete(uuid);
  }
}
