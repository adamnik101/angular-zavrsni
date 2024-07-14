import { Component, OnInit } from '@angular/core';
import { TracksTableService } from '../core/services/tracks/table/tracks-table.service';
import { TracksTableComponent } from '../core/components/tracks/tracks-table/tracks-table.component';
import { LikedTracksService } from '../core/user/services/liked-tracks/liked-tracks.service';

@Component({
  selector: 'app-liked-tracks',
  standalone: true,
  imports: [TracksTableComponent],
  templateUrl: './liked-tracks.component.html',
  styleUrl: './liked-tracks.component.scss'
})
export class LikedTracksComponent implements OnInit {

  constructor(
    private tracksTableService: TracksTableService,
    private likedTracksService: LikedTracksService
  ) {}

  ngOnInit(): void {
    this.tracksTableService.setTracks(this.likedTracksService.likedTracks());
  }
}
