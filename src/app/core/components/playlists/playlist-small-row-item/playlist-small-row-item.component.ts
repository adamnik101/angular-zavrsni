import { Component, Input } from '@angular/core';
import { IPlaylist } from '../../../interfaces/playlist/i-playlist';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { QueueService } from '../../../services/queue/base/queue.service';
import { PlaylistsService } from '../../../services/playlists/base/playlists.service';
import { PlayingFromService } from '../../../services/playing-from/playing-from.service';
import { AudioService } from '../../../services/audio/audio.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NgClass } from '@angular/common';
import { LikedTracksService } from '../../../user/services/liked-tracks/liked-tracks.service';
import { PlayAllButtonComponent } from '../../play-all-button/play-all-button.component';

@Component({
  selector: 'app-playlist-small-row-item',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconButton, MatIcon, MatTooltip, MatProgressSpinner, NgClass, PlayAllButtonComponent],
  templateUrl: './playlist-small-row-item.component.html',
  styleUrl: './playlist-small-row-item.component.scss'
})
export class PlaylistSmallRowItemComponent {

  constructor(
    private queueService: QueueService,
    public playlistsService: PlaylistsService,
    public playingFromService: PlayingFromService,
    public audioService: AudioService,
    private likedTracksService: LikedTracksService,
  ) {}
  
  @Input() public playlist: IPlaylist = {} as IPlaylist;

  play(event: any): void {
    this.playlistsService.get<IPlaylist>(this.playlist.id).subscribe({
      next: (data) => {
        const tracks = data.data.tracks;

        this.queueService.setQueue(tracks);
        this.queueService.resetQueueIndex();
        this.playingFromService.playingFrom.set(data.data.id);
      }
    })
  }

  pause(event: any): void {
    this.audioService.pause();
  }

  continue(event: any): void {
    this.audioService.continue();
  }
}
