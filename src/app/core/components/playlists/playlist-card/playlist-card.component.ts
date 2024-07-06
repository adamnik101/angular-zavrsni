import { Component, Input } from '@angular/core';
import { IPlaylist } from '../../../interfaces/playlist/i-playlist';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-playlist-card',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './playlist-card.component.html',
  styleUrl: './playlist-card.component.scss'
})
export class PlaylistCardComponent {

  @Input() public playlist: IPlaylist = {} as IPlaylist;

}
