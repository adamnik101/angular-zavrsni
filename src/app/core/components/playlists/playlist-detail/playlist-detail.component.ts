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
import { Subscription } from 'rxjs';
import { UserService } from '../../../user/services/user/user.service';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { PlaylistFormComponent } from '../playlist-form/playlist-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-playlist-detail',
  standalone: true,
  imports: [TracksTableComponent, MatMiniFabButton, MatIcon, MatTooltip],
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
    private likedTracksService: LikedTracksService,
    private userService: UserService,
    private matDialog: MatDialog
  ) {}

  public playlist: IPlaylist = {} as IPlaylist;
  public isEditable: boolean = false;
  public hasCover: boolean = false;

  @ViewChild('back') private back: ElementRef = {} as ElementRef;
  @ViewChild('image') private image: ElementRef = {} as ElementRef;
  @ViewChild('canvas') private canvas: ElementRef = {} as ElementRef;

  private subscription: Subscription = new Subscription();

  private formDialog = {
    component: PlaylistFormComponent,
    dimensions: {
      width: "600px",
      height: "auto",
      customPanel: "playlist-form"
    }
  };

  ngOnInit(): void {
    this.subscription.add(
      this.route.paramMap.subscribe({
        next: (data) => {
          const id = data.get("id");
  
          if(id) {
            this.getPlaylist(id);
          }
        }
      })
    );
  }

  ngAfterViewInit(): void {
    console.log(this.playlist.image_url)
    
  }

  getPlaylist(id: string, showSpinner: boolean = true): void {
    if(showSpinner) SpinnerFunctions.showSpinner();
  
    this.playlistsService.get<IPlaylist>(id).subscribe({
      next: (response) => {
          this.back.nativeElement.style.background = '#070707';

          this.playlist = response.data;
          this.playlist.tracks.forEach(track => {
              track['liked'] = this.likedTracksService.likedTracks().some(t => t.id === track.id);
            })
          this.tracksTableService.setTracks(this.playlist.tracks);
            
          const userId = this.userService.user()?.id;

          if(userId) {
            this.isEditable = (userId === this.playlist.user_id);
          }

            this.image.nativeElement.onload = () => {
              const color = this.dominantColorService.getDominantColorFromImage(this.image.nativeElement, this.canvas.nativeElement);
        
              this.back.nativeElement.style.background = `linear-gradient(to top, #070707 0%, #07070795 20%, ${color} 100%)`
            } 

          if(showSpinner) SpinnerFunctions.hideSpinner();
      }
    });
  }

  openFormDialog(): void {
    this.subscription.add(
      this.matDialog.open(this.formDialog.component, {
        width: this.formDialog.dimensions.width,
        height: this.formDialog.dimensions.height,
        panelClass: this.formDialog.dimensions.customPanel,
        data: this.playlist
      }).afterClosed().subscribe({
        next: (data) => {
          if (data) {
            this.getPlaylist(this.playlist.id, false);
          }
        }
      })
    );
  }

  onTrackPlayed(event: any): void {
    this.queueService.setFrom(this.playlist.id);
  }

  ngOnDestroy(): void {
    this.tracksTableService.resetTracks();
    this.subscription.unsubscribe();
  }
}
