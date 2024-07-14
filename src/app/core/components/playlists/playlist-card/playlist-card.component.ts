import { Component, Input } from '@angular/core';
import { IPlaylist } from '../../../interfaces/playlist/i-playlist';
import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlayAllButtonComponent } from '../../play-all-button/play-all-button.component';
import { PlaylistsService } from '../../../services/playlists/base/playlists.service';

@Component({
  selector: 'app-playlist-card',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, DecimalPipe, PlayAllButtonComponent],
  templateUrl: './playlist-card.component.html',
  styleUrl: './playlist-card.component.scss'
})
export class PlaylistCardComponent {

  constructor(
    public apiService: PlaylistsService
  ) {}
  
  @Input() public playlist: IPlaylist = {} as IPlaylist;

  playAll(event: any): void {

  }
}
