import { Injectable, signal } from '@angular/core';
import { IPlaylist } from '../../../interfaces/playlist/i-playlist';

@Injectable({
  providedIn: 'root'
})
export class UserPlaylistsService {

  constructor() { }

  playlists = signal<IPlaylist[]>([]);

  setPlaylists(playlists: IPlaylist[]): void {
    this.playlists.set(playlists);
  }
}
