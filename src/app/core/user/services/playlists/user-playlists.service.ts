import { Injectable, signal } from '@angular/core';
import { IPlaylist } from '../../../interfaces/playlist/i-playlist';
import { PlaylistsService } from '../../../services/playlists/base/playlists.service';
import { SpinnerFunctions } from '../../../static/spinner-functions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPlaylistsService {

  constructor(
    private playlistsService: PlaylistsService
  ) { }

  playlists = signal<IPlaylist[]>([]);

  setPlaylists(playlists: IPlaylist[]): void {
    this.playlists.set(playlists);
  }

  getPlaylists(showSpinner: boolean = true): void {
    if(showSpinner) SpinnerFunctions.showSpinner();

    this.playlistsService.getAll<IPlaylist[]>().subscribe({
      next: (data) => {
        this.setPlaylists(data.data);
        if(showSpinner) SpinnerFunctions.hideSpinner();
      }
    });
  }

  deletePlaylist(id: string): Observable<any> {
    return this.playlistsService.delete(id);
  }
}
