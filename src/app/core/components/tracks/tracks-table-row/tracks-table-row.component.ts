import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, signal, ViewChild } from '@angular/core';
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
import { AudioService } from '../../../services/audio/audio.service';
import { PlaylistsService } from '../../../services/playlists/base/playlists.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogWithActionsComponent } from '../../../../shared/components/confirm-dialog-with-actions/confirm-dialog-with-actions.component';
import { NgClass } from '@angular/common';
import { TracksTableRowService } from '../../../services/tracks/tracks-table-row/tracks-table-row.service';
import { Subscription } from 'rxjs';
import { TracksTableService } from '../../../services/tracks/table/tracks-table.service';
import { PlaylistFormComponent } from '../../playlists/playlist-form/playlist-form.component';
import { IPlaylist } from '../../../interfaces/playlist/i-playlist';
import { CommonInputType } from '../../../../shared/form-fields/common-input/interfaces/i-common-input';
import { CommonInputComponent } from '../../../../shared/form-fields/common-input/common-input.component';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tracks-table-row',
  standalone: true,
  imports: [MatIcon, MatIconButton, RouterLink, FormatDurationFromSecondsPipe, MatMenuModule, NgClass, CommonInputComponent],
  templateUrl: './tracks-table-row.component.html',
  styleUrl: './tracks-table-row.component.scss'
})
export class TracksTableRowComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    public queueService: QueueService,
    public route: ActivatedRoute,
    public likedTracksService: LikedTracksService,
    public userPlaylistsService: UserPlaylistsService,
    public userService: UserService,
    public trackTableRowService: TracksTableRowService,
    private alertService: AlertService,
    private audioService: AudioService,
    private playlistsService: PlaylistsService,
    private matDialog: MatDialog,
    private tracksTableService: TracksTableService,
    private formBuilder: FormBuilder
  ) {}

  public currentSectionId: string = "";
  public isThisTrackBeingPlayed: boolean = false;
  public liked: boolean = false;
  public features: Map<string, string> = new Map<string, string>();
  public isSelectedRow: boolean = false;
  
  public filteredPlaylists = signal<IPlaylist[]>(this.userPlaylistsService.playlists());

  @Input({required: true}) public index: number = 0;
  @Input({required: true}) public track: ITrack = {} as ITrack;

  @Output() public onPlay: EventEmitter<ITrack> = new EventEmitter();

  @ViewChild('trigger') contextTrigger!: MatMenuTrigger;
  @ViewChild('row') row!: ElementRef;

  public contextMenuPosition = { x: '0px', y: '0px' };

  public commonInputType = CommonInputType;
  public searchControl = this.formBuilder.group({
    search: this.formBuilder.control('')
  });
  private subscription: Subscription = new Subscription();

  private newPlaylistDialog: any = {
    component: PlaylistFormComponent,
    dimensions: {
      width: "500px",
      height: "auto",
      customPanel: "playlist-form"
    }
  };

  ngOnInit(): void {
    this.setFeatures();
  }

  ngAfterViewInit(): void {
    this.subscription.add(
      this.contextTrigger.menuClosed.subscribe({
        next: (data: any) => {      
          this.afterContextMenuClosed();
        }
      })
    );
  }

  setFeatures(): void {
    this.track.features.forEach(feature => {
      this.features.set(feature.id, feature.name);
    });
  }

  play(): void {
    this.onPlay.emit(this.track);
    this.audioService.play();
  }

  toggleLike(event: any): void {
    if(this.track.liked) {
      this.removeFromLiked();
    } else {
      this.addToLiked();
    }
  }

  addToLiked(): void {
    this.likedTracksService.addToLiked(this.track.id).subscribe({
      next: (response) => {
        
      },
      error: (err) => {
        
      }
    })
  }

  removeFromLiked(): void {
    this.likedTracksService.removeFromLiked(this.track.id).subscribe({
      next: (data) => {
        
      },
      error: (err) => {
        
      }
    })
  }

  addToQueue(event: any): void {
    this.queueService.addToQueue(this.track);
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
    this.selectRow();
  }

  selectRow(event?: any): void {
    this.trackTableRowService.currTrack.set(this.track.id);
  }

  removeSelected(): void {
    this.trackTableRowService.currTrack.set(null);
  }

  afterContextMenuClosed(): void {
    this.trackTableRowService.currTrack.set(null);
  }

  addToPlaylist(id: string): void {
    this.playlistsService.addTracksToPlaylist([this.track.id], id).subscribe({
      next: (data) => {
        this.alertService.showDefaultMessage(data.data.message);
      },
      error: (err) => {
        const errResponse = err.error;
        if(errResponse.hasOwnProperty("errors") &&  errResponse.status_code === 422) {
          const dialogHeader = errResponse.errors.tracks_already_in_playlist.length > 1 ? "Some already added" : "Already added"
          this.matDialog.open(ConfirmDialogWithActionsComponent, {
            data: {
              header: dialogHeader,
              message: errResponse.errors.content,
              actions: errResponse.errors.actions
            }
          })
          return;
        }

        this.alertService.showErrorMessage(err.error.message);
      }
    })
  }

  openCreateNewPlaylistDialog(): void {
    this.matDialog.open(this.newPlaylistDialog.component, this.newPlaylistDialog.dimensions);
  }

  searchPlaylists(searchBy: string): void {
    let filteredPlaylists: IPlaylist[] = [];

    this.userPlaylistsService.playlists().filter(playlist => {
      if(playlist.title.toLowerCase().trim().includes(searchBy.toLowerCase().trim())) {
        filteredPlaylists.push(playlist);
      }
    });

    this.filteredPlaylists.set(filteredPlaylists);
  }

  ngOnDestroy(): void {
    this.removeSelected();
  }
}
