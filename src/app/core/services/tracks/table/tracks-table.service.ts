import { Injectable, signal } from '@angular/core';
import { ITrack } from '../../../interfaces/tracks/i-track';
import { UserTrackLikesService } from '../../../user/services/tracks/user-track-likes.service';
import { LikedTracksService } from '../../../user/services/liked-tracks/liked-tracks.service';

@Injectable({
  providedIn: 'root'
})
export class TracksTableService {

  constructor(
    // private likedTracksService: LikedTracksService
  ) {}

  public tracks = signal<ITrack[]>([]);

  public setTracks(tracks: ITrack[]): void {
    // tracks.forEach(track => {
    //   track['liked'] = this.likedTracksService.likedTracks().some(t => t.id === track.id);
    // })
    this.tracks.set(tracks);
  }


  public resetTracks(): void {
    this.tracks.set([]);
  }
}
