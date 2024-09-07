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
    private playlistsService: PlaylistsService
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

        this.playlistsService.addTracksToPlaylist(tracksToAdd, target.id).subscribe({
          next: (data) => {
            console.log(data);
          }
        })
      }
    }
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
