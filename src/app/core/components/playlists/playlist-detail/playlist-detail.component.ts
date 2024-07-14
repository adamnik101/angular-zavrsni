import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpinnerFunctions } from '../../../static/spinner-functions';
import { IPlaylist } from '../../../interfaces/playlist/i-playlist';
import { PlaylistsService } from '../../../services/playlists/base/playlists.service';
import { TracksTableService } from '../../../services/tracks/table/tracks-table.service';
import { TracksTableComponent } from '../../tracks/tracks-table/tracks-table.component';
import { QueueService } from '../../../services/queue/base/queue.service';

@Component({
  selector: 'app-playlist-detail',
  standalone: true,
  imports: [TracksTableComponent],
  templateUrl: './playlist-detail.component.html',
  styleUrl: './playlist-detail.component.scss'
})
export class PlaylistDetailComponent implements OnInit, OnDestroy{

  constructor(
    private route: ActivatedRoute,
    private playlistsService: PlaylistsService,
    private tracksTableService: TracksTableService,
    private queueService: QueueService
  ) {}

  public playlist: IPlaylist = {} as IPlaylist;

  @ViewChild('back') private back: ElementRef = {} as ElementRef;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if(id) {
      SpinnerFunctions.showSpinner();

      this.playlistsService.get<IPlaylist>(id).subscribe({
        next: (response) => {
          this.playlist = response.data;
          this.tracksTableService.setTracks(this.playlist.tracks);
          this.back.nativeElement.style.backgroundImage = `url(${this.playlist.image_url})`;

          SpinnerFunctions.hideSpinner();
        }
      });
      
    }
  }

  onTrackPlayed(event: any): void {
    console.log('track played./..')
    this.queueService.setFrom(this.playlist.id);
  }

  ngOnDestroy(): void {
    this.tracksTableService.resetTracks();
  }
}
