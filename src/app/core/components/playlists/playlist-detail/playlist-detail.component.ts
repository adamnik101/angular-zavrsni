import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpinnerFunctions } from '../../../static/spinner-functions';
import { IPlaylist } from '../../../interfaces/playlist/i-playlist';
import { PlaylistsService } from '../../../services/playlists/base/playlists.service';
import { TracksTableService } from '../../../services/tracks/table/tracks-table.service';
import { TracksTableComponent } from '../../tracks/tracks-table/tracks-table.component';
import { QueueService } from '../../../services/queue/base/queue.service';
import { DominantColorService } from '../../../../shared/services/dominant-color/dominant-color.service';
import { LikedTracksService } from '../../../user/services/liked-tracks/liked-tracks.service';

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
    private queueService: QueueService,
    private dominantColorService: DominantColorService,
    private likedTracksService: LikedTracksService
  ) {}

  public playlist: IPlaylist = {} as IPlaylist;

  @ViewChild('back') private back: ElementRef = {} as ElementRef;
  @ViewChild('image') private image: ElementRef = {} as ElementRef;
  @ViewChild('canvas') private canvas: ElementRef = {} as ElementRef;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if(id) {
      SpinnerFunctions.showSpinner();

      this.playlistsService.get<IPlaylist>(id).subscribe({
        next: (response) => {
          console.log(response)
          this.playlist = response.data;
          this.playlist.tracks.forEach(track => {
              track['liked'] = this.likedTracksService.likedTracks().some(t => t.id === track.id);
            })
          this.tracksTableService.setTracks(this.playlist.tracks);

          SpinnerFunctions.hideSpinner();
        }
      });
      
    }
  }

  ngAfterViewInit(): void {
    this.image.nativeElement.onload = () => {
      const color = this.dominantColorService.getDominantColorFromImage(this.image.nativeElement, this.canvas.nativeElement);

      this.back.nativeElement.style.background = `linear-gradient(45deg, #070707 0%, #07070795 20%, ${color} 100%)`
    }
  }

  onTrackPlayed(event: any): void {
    this.queueService.setFrom(this.playlist.id);
  }

  ngOnDestroy(): void {
    this.tracksTableService.resetTracks();
  }
}
