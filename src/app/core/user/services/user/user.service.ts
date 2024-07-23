import { Injectable, signal } from '@angular/core';
import { UserPlaylistsService } from '../playlists/user-playlists.service';
import { LikedTracksService } from '../liked-tracks/liked-tracks.service';
import { IUser } from '../../../interfaces/user/i-user';
import { IApiResponse } from '../../../../shared/interfaces/i-api-response';
import { UserSettingsService } from '../settings/user-settings.service';
import { ISettings } from '../../../../settings/interfaces/settings/i-settings';
import { UserArtistFollowingsService } from '../artists/user-artist-followings.service';
import { UserAlbumLikesService } from '../albums/user-album-likes.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private playlistsService: UserPlaylistsService,
    private likedTracksService: LikedTracksService,
    private userSettingsService: UserSettingsService,
    private userArtistsFollowingsService: UserArtistFollowingsService,
    private userAlbumLikesService: UserAlbumLikesService
  ) { }

  loggedIn = signal<boolean | null>(null);

  setUserData(data: IUser | null): void {
    this.loggedIn.set(data ? true : false);
    this.setUserPlaylists(data?.playlists ?? []);
    this.setUserLikedTracks(data?.liked_tracks ?? []);
    this.setUserArtistsFollowings(data?.followings ?? []);
    this.setUserAlbumLikes(data?.liked_albums ?? []);
    this.setUserSettings(data?.settings ?? {} as ISettings);
  }

  setUserPlaylists(playlists: any): void {
    this.playlistsService.setPlaylists(playlists)
  }

  setUserLikedTracks(tracks: any): void {
    this.likedTracksService.setLikedTracks(tracks);
  }

  setUserArtistsFollowings(artists: any): void {
    this.userArtistsFollowingsService.setArtists(artists);
  }

  setUserAlbumLikes(albums: any): void {
    this.userAlbumLikesService.setAlbums(albums);
  }

  setUserSettings(settings: ISettings): void {
    this.userSettingsService.setSettings(settings);
  }
}
