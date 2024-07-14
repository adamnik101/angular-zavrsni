import { Injectable, signal } from '@angular/core';
import { UserPlaylistsService } from '../playlists/user-playlists.service';
import { LikedTracksService } from '../liked-tracks/liked-tracks.service';
import { IUser } from '../../../interfaces/user/i-user';
import { IApiResponse } from '../../../../shared/interfaces/i-api-response';
import { UserSettingsService } from '../settings/user-settings.service';
import { ISettings } from '../../../../settings/interfaces/settings/i-settings';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private playlistsService: UserPlaylistsService,
    private likedTracksService: LikedTracksService,
    private userSettingsService: UserSettingsService
  ) { }

  loggedIn = signal<boolean | null>(null);

  setUserData(data: IUser): void {
    this.loggedIn.set(true);
    this.setUserPlaylists(data.playlists);
    this.setUserLikedTracks(data.liked_tracks);
    this.setUserSettings(data.settings);
  }

  setUserPlaylists(playlists: any): void {
    this.playlistsService.setPlaylists(playlists)
  }

  setUserLikedTracks(tracks: any): void {
    this.likedTracksService.setLikedTracks(tracks);
  }

  setUserSettings(settings: ISettings): void {
    this.userSettingsService.setSettings(settings);
  }
}
