import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { TracksTableService } from '../../../services/tracks/table/tracks-table.service';
import { TracksTableRowComponent } from '../tracks-table-row/tracks-table-row.component';
import { TracksTablePlaceholderRowComponent } from '../tracks-table-placeholder-row/tracks-table-placeholder-row.component';
import { QueueService } from '../../../services/queue/base/queue.service';
import { NoResultsComponent } from '../../../../shared/components/no-results/no-results.component';
import { ITrack } from '../../../interfaces/tracks/i-track';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkDrag, CdkDragDrop, CdkDragPreview, CdkDragStart, CdkDropList } from '@angular/cdk/drag-drop';
import { TrackSelectionService } from '../../../services/tracks/track-selection.service';
import { PlaylistsService } from '../../../services/playlists/base/playlists.service';
import { IApiResponse } from '../../../../shared/interfaces/i-api-response';
import { ConfirmDialogWithActionsComponent } from '../../../../shared/components/confirm-dialog-with-actions/confirm-dialog-with-actions.component';
import { ConfirmDialogActions } from '../../../../shared/components/confirm-dialog-with-actions/enums/confirm-dialog-actions';
import { UserPlaylistsService } from '../../../user/services/playlists/user-playlists.service';
import { AlertService } from '../../../../shared/services/alert/alert.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tracks-table',
  standalone: true,
  imports: [TracksTableRowComponent, TracksTablePlaceholderRowComponent, NoResultsComponent, CdkDropList, CdkDrag, CdkDragPreview],
  templateUrl: './tracks-table.component.html',
  styleUrl: './tracks-table.component.scss'
})
export class TracksTableComponent implements OnInit, OnDestroy{

  constructor(
    public tracksTableService: TracksTableService,
    public trackSelectionService: TrackSelectionService,
    private queueService: QueueService,
    private playlistsService: PlaylistsService,
    private userPlaylistsService: UserPlaylistsService,
    private alertService: AlertService,
    private matDialog: MatDialog
  ) {}

  @Output() public OnTrackPlayed: EventEmitter<any> = new EventEmitter();


  ngOnInit(): void {
    console.log(this.queueService.getFrom())
  }

  onPlay(event: any, newIndex: number): void {
    this.OnTrackPlayed.emit(event);
    this.setQueue();
    this.setQueueIndex(newIndex);
  }

  setQueue(): void {
    this.queueService.setQueue(this.tracksTableService.tracks());
  }

  setQueueIndex(newIndex: number): void {
    this.queueService.setQueueIndex(newIndex);
  }

  onClick(event: any, track: ITrack): void {
    if(event.ctrlKey) {
      this.selectTrack(track);
    }
  }
  onDragStarted(event: any) {
    this.trackSelectionService.isSelectionDragging.next(true);
  }

  onDragDropped(event: any) {
    this.trackSelectionService.isSelectionDragging.next(false);
    if(event.previousContainer === event.container) {
      let target = (event.event.target as HTMLElement).closest('.custom-playlist-id');

      if(target) {
        const tracksToAdd = this.trackSelectionService.trackSelection.selected.map(x => x.id);

        const id = target.id;

        this.addToPlaylist(tracksToAdd, id);
      }
    }
  }

  private addToPlaylist(trackIds: string[], id: string, confirm: boolean | null = null): void {
    this.playlistsService.addTracksToPlaylist(trackIds, id, confirm).subscribe({
      next: (data: IApiResponse<any>) => {
        const addedCount = data.data.added_count;
        
        this.userPlaylistsService.playlists.update(playlists => {
          const indexToUpdate = playlists.findIndex(playlist => playlist.id === id);
          
          if(indexToUpdate !== -1) {
            playlists[indexToUpdate].tracks_count += addedCount;
          }

          return playlists;
        });
        this.trackSelectionService.trackSelection.setSelection();
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
          }).afterClosed().subscribe({
            next: (data) => {
              this.trackSelectionService.trackSelection.setSelection();

              if(data.state && data.action === ConfirmDialogActions.addAnyway) {
                this.addToPlaylist(trackIds, id, true);
              } else if(data.state && data.action === ConfirmDialogActions.addAll) {
                this.addToPlaylist(trackIds, id, true);
              } else if(data.state && data.action === ConfirmDialogActions.addNewOnes) {
                let allTrackIds = errResponse.errors.all_tracks_id as string[];

                let tracksAlreadyAdded = Object.values(errResponse.errors.tracks_already_in_playlist) as string[];
                let newOnes: string[] = [];
                console.log(Object.values(tracksAlreadyAdded), allTrackIds)

                const uniqueTrackIds = allTrackIds.filter(x => !tracksAlreadyAdded.includes(x));

                // for(let trackId of allTrackIds) {
                //   for(let addedId of tracksAlreadyAdded) {
                //     console.log(trackId, addedId)
                //       if(!allTrackIds.includes(addedId) && !newOnes.includes(trackId)) {
                //         newOnes.push(trackId);
                //       }
                //   }
                // }
                
                console.log(uniqueTrackIds)
                this.addToPlaylist(uniqueTrackIds, id);
              }

            }
          })
          return;
        }

        this.alertService.showErrorMessage(err.error.message);
      }
    })
  }

  onMouseDown(event: any, track: ITrack): void {
    if(!event.ctrlKey && this.trackSelectionService.trackSelection.selected.length <= 1) {
      this.trackSelectionService.trackSelection.setSelection(track);
    }
  }

  selectTrack(track: ITrack): void {
    if(this.trackSelectionService.trackSelection.isSelected(track)) {
      this.trackSelectionService.trackSelection.deselect(track);
    } else {
      this.trackSelectionService.trackSelection.select(track);
    }

  }

  ngOnDestroy(): void {
    this.trackSelectionService.trackSelection.setSelection();
  }
}
