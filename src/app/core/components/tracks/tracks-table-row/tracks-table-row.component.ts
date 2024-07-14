import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ITrack } from '../../../interfaces/tracks/i-track';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { QueueService } from '../../../services/queue/base/queue.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormatDurationFromSecondsPipe } from '../../../../shared/pipes/format-duration-from-seconds.pipe';
import { LikedTracksService } from '../../../user/services/liked-tracks/liked-tracks.service';
import { UserService } from '../../../user/services/user/user.service';
import { AlertService } from '../../../../shared/services/alert/alert.service';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { UserPlaylistsService } from '../../../user/services/playlists/user-playlists.service';

@Component({
  selector: 'app-tracks-table-row',
  standalone: true,
  imports: [MatIcon, MatIconButton, RouterLink, FormatDurationFromSecondsPipe, MatMenuModule],
  templateUrl: './tracks-table-row.component.html',
  styleUrl: './tracks-table-row.component.scss'
})
export class TracksTableRowComponent implements OnInit {

  constructor(
    public queueService: QueueService,
    public route: ActivatedRoute,
    public likedTracksService: LikedTracksService,
    public userPlaylistsService: UserPlaylistsService,
    public userService: UserService,
    private alertService: AlertService
  ) {}

  public currentSectionId: string = "";
  public isThisTrackBeingPlayed: boolean = false;
  public liked: boolean = false;
  public features: Map<string, string> = new Map<string, string>();

  @Input({required: true}) public index: number = 0;
  @Input({required: true}) public track: ITrack = {} as ITrack;

  @Output() public onPlay: EventEmitter<ITrack> = new EventEmitter();

  @ViewChild('trigger') contextTrigger!: MatMenuTrigger;
  public contextMenuPosition = { x: '0px', y: '0px' };

  ngOnInit(): void {
    this.checkIfLiked();
    this.setFeatures();
  }

  checkIfLiked(): void {
    const isLiked = this.likedTracksService.likedTracks().findIndex(x => x.id === this.track.id);
    this.liked = isLiked != -1;
  }

  setFeatures(): void {
    this.track.features.forEach(feature => {
      this.features.set(feature.id, feature.name);
    });
  }

  play(): void {
    this.onPlay.emit(this.track);
  }

  addToLiked(): void {
    this.likedTracksService.addToLiked(this.track.id).subscribe({
      next: (response) => {
        console.log(response)
        if(response.status_code === 200) {
          this.likedTracksService.likedTracks.update(tracks => {
            return [response.data].concat(tracks);
          });
          
          this.checkIfLiked();
        }

        this.alertService.showDefaultMessage(response.message);
      },
      error: (err) => {
        this.alertService.showErrorMessage(err.message);
      }
    })
  }

  removeFromLiked(): void {
    this.likedTracksService.removeFromLiked(this.track.id).subscribe({
      next: (data) => {
        this.likedTracksService.likedTracks.update(tracks => {
          const withoutRemoved = tracks.filter(track => track.id != this.track.id);
          return withoutRemoved;
        });
        
        this.checkIfLiked();

        this.alertService.showDefaultMessage("Removed from liked.");
      },
      error: (err) => {
        this.alertService.showErrorMessage(err.message);
      }
    })
  }

  onContextMenu(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    
    this.openContextMenu();
  }

  openContextMenu(): void {
    this.contextTrigger.openMenu();
  }
}
