import { Component, Input } from '@angular/core';
import { IAlbum } from '../../../interfaces/album/i-album';
import { PlayingFromService } from '../../../services/playing-from/playing-from.service';
import { AudioService } from '../../../services/audio/audio.service';
import { QueueService } from '../../../services/queue/base/queue.service';
import { NgClass } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AlbumsService } from '../../../services/albums/base/albums.service';

@Component({
  selector: 'app-album-small-row-item',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconButton, MatIcon, MatTooltip, MatProgressSpinner, NgClass],
  templateUrl: './album-small-row-item.component.html',
  styleUrl: './album-small-row-item.component.scss'
})
export class AlbumSmallRowItemComponent {

  constructor(
    private queueService: QueueService,
    private albumsService: AlbumsService,
    public playingFromService: PlayingFromService,
    public audioService: AudioService
  ) {}

  @Input() public album: IAlbum = {} as IAlbum;

  play(event: any): void {
    this.albumsService.get<IAlbum>(this.album.id).subscribe({
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
