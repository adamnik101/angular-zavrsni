import { Component, Input } from '@angular/core';
import { IArtist } from '../../../interfaces/artist/i-artist';
import { NgClass } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PlayAllButtonComponent } from '../../play-all-button/play-all-button.component';
import { QueueService } from '../../../services/queue/base/queue.service';
import { ArtistsService } from '../../../services/artists/base/artists.service';
import { PlayingFromService } from '../../../services/playing-from/playing-from.service';
import { AudioService } from '../../../services/audio/audio.service';

@Component({
  selector: 'app-artist-small-row-item',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconButton, MatIcon, MatTooltip, MatProgressSpinner, NgClass, PlayAllButtonComponent],
  templateUrl: './artist-small-row-item.component.html',
  styleUrl: './artist-small-row-item.component.scss'
})
export class ArtistSmallRowItemComponent {

  constructor(
    private queueService: QueueService,
    public artistsService: ArtistsService,
    public playingFromService: PlayingFromService,
    public audioService: AudioService
  ) {}
  @Input() public artist: IArtist = {} as IArtist;
}
