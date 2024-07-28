import { Component, Input, ViewChild } from '@angular/core';
import { IPlaylist } from '../../../interfaces/playlist/i-playlist';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { QueueService } from '../../../services/queue/base/queue.service';
import { PlaylistsService } from '../../../services/playlists/base/playlists.service';
import { PlayingFromService } from '../../../services/playing-from/playing-from.service';
import { AudioService } from '../../../services/audio/audio.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NgClass } from '@angular/common';
import { LikedTracksService } from '../../../user/services/liked-tracks/liked-tracks.service';
import { PlayAllButtonComponent } from '../../play-all-button/play-all-button.component';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistFormComponent } from '../playlist-form/playlist-form.component';
import { ConfirmDialogActions } from '../../../../shared/components/confirm-dialog-with-actions/enums/confirm-dialog-actions';
import { ConfirmDialogWithActionsComponent } from '../../../../shared/components/confirm-dialog-with-actions/confirm-dialog-with-actions.component';
import { UserPlaylistsService } from '../../../user/services/playlists/user-playlists.service';
import { AlertService } from '../../../../shared/services/alert/alert.service';

@Component({
  selector: 'app-playlist-small-row-item',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconButton, MatIcon, MatTooltip,
    MatProgressSpinner, NgClass, PlayAllButtonComponent,
    MatMenu, MatMenuItem, MatMenuTrigger
  ],
  templateUrl: './playlist-small-row-item.component.html',
  styleUrl: './playlist-small-row-item.component.scss'
})
export class PlaylistSmallRowItemComponent {

  constructor(
    private queueService: QueueService,
    public playlistsService: PlaylistsService,
    public playingFromService: PlayingFromService,
    public audioService: AudioService,
    private likedTracksService: LikedTracksService,
    private matDialog: MatDialog,
    private userPlaylistsService: UserPlaylistsService,
    private alertService: AlertService
  ) {}
  
  @Input() public playlist: IPlaylist = {} as IPlaylist;

  @ViewChild('trigger') contextTrigger!: MatMenuTrigger;
  public contextMenuPosition = { x: '0px', y: '0px' };
  
  play(event: any): void {
    this.playlistsService.get<IPlaylist>(this.playlist.id).subscribe({
      next: (data) => {
        const tracks = data.data.tracks;

        this.queueService.setQueue(tracks);
        this.queueService.resetQueueIndex();
        this.playingFromService.playingFrom.set(data.data.id);
      }
    })
  }

  pause(event: any): void {
    this.audioService.pause();
  }

  continue(event: any): void {
    this.audioService.continue();
  }

  openMenu(event: MouseEvent): void {
    event.preventDefault();

    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    
    this.openContextMenu();
  }

  openContextMenu(): void {
    this.contextTrigger.openMenu();
  }

  edit(): void {
    this.matDialog.open(PlaylistFormComponent, {
      width: '600px',
      height: 'auto',
      panelClass: 'playlist-form',
      data: this.playlist
    }).afterClosed().subscribe({
      next: (data) => {
        if (data) {
          this.userPlaylistsService.getPlaylists(false);
        }
      }
    });
  }

  delete(): void {
    this.matDialog.open(ConfirmDialogWithActionsComponent, {
      width: '500px',
      height: 'auto',
      data: {
        header: 'Delete from My Library',
        message: `This will delete '${this.playlist.title}' from 'My Library'.`,
        actions: [ConfirmDialogActions.confirm]
      }
    }).afterClosed().subscribe({
      next: (data) => {
        if(data.state && data.action === ConfirmDialogActions.confirm) {
          this.userPlaylistsService.deletePlaylist(this.playlist.id).subscribe({
            next: (data) => {
              this.userPlaylistsService.playlists.update(playlists => {
                let indexToDelete = playlists.findIndex(playlist => playlist.id === this.playlist.id);

                if(indexToDelete !== -1) {
                  playlists.splice(indexToDelete, 1);
                }

                return playlists;
              });

              this.alertService.showDefaultMessage("Removed from My Library.");
            }
          });
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
