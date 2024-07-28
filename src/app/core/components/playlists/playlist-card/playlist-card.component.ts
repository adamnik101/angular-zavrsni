import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { IPlaylist } from '../../../interfaces/playlist/i-playlist';
import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlayAllButtonComponent } from '../../play-all-button/play-all-button.component';
import { PlaylistsService } from '../../../services/playlists/base/playlists.service';
import { DominantColorService } from '../../../../shared/services/dominant-color/dominant-color.service';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { UserService } from '../../../user/services/user/user.service';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistFormComponent } from '../playlist-form/playlist-form.component';
import { UserPlaylistsService } from '../../../user/services/playlists/user-playlists.service';
import { ConfirmDialogWithActionsComponent } from '../../../../shared/components/confirm-dialog-with-actions/confirm-dialog-with-actions.component';
import { ConfirmDialogActions } from '../../../../shared/components/confirm-dialog-with-actions/enums/confirm-dialog-actions';
import { AlertService } from '../../../../shared/services/alert/alert.service';
import { MatDivider } from '@angular/material/divider';
import { QueueService } from '../../../services/queue/base/queue.service';
import { PlaylistsFormService } from '../../../services/playlists/forms/playlists-form.service';

@Component({
  selector: 'app-playlist-card',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, DecimalPipe, PlayAllButtonComponent, MatMenuTrigger, MatMenu, MatMenuItem, MatIcon, MatDivider],
  templateUrl: './playlist-card.component.html',
  styleUrl: './playlist-card.component.scss'
})
export class PlaylistCardComponent implements AfterViewInit {

  constructor(
    public apiService: PlaylistsService,
    private dominantColorService: DominantColorService,
    public userService: UserService,
    private matDialog: MatDialog,
    private userPlaylistsService: UserPlaylistsService,
    private alertService: AlertService,
    private queueService: QueueService,
    private playlistService: PlaylistsService,
    private playlistFormService: PlaylistsFormService
  ) {}
  
  @Input() public playlist: IPlaylist = {} as IPlaylist;
  @ViewChild('card') public cardElement!: ElementRef;
  @ViewChild('myCanvas', {static: false}) myCanvas!: ElementRef;
  @ViewChild('image') image!: ElementRef;
  
  private cardColor: string = "#23232375";
  private cardHoverColor: string = "";

  @ViewChild('trigger') contextTrigger!: MatMenuTrigger;
  public contextMenuPosition = { x: '0px', y: '0px' };

  ngAfterViewInit(): void {
    this.image.nativeElement.onload = () => {
      this.cardHoverColor = this.dominantColorService.getDominantColorFromImage(this.image.nativeElement, this.myCanvas.nativeElement);
    }
  }

  playAll(event: any): void {

  }

  applyBackground(): void {
    this.cardElement.nativeElement.style.backgroundColor = this.cardHoverColor; 
  }

  removeBackground(): void {
    this.cardElement.nativeElement.style.backgroundColor = this.cardColor; 
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

  addToQueue(event: any): void {
    if(this.playlist.tracks_count) {
      this.playlistService.get<IPlaylist>(this.playlist.id).subscribe({
        next: (data) => {
          const tracksCount = data.data.tracks_count;
          const tracks = data.data.tracks;

          if(tracksCount) {
            this.queueService.addTracksToQueue(tracks);
          }
        }
      })
    }
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
