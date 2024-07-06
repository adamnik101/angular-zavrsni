import { Component } from '@angular/core';
import { LikedTracksService } from '../core/user/services/liked-tracks/liked-tracks.service';

@Component({
  selector: 'app-liked-songs',
  standalone: true,
  imports: [],
  templateUrl: './liked-songs.component.html',
  styleUrl: './liked-songs.component.scss'
})
export class LikedSongsComponent {

  constructor(
    public likedTracksService: LikedTracksService
  ) {}

}
