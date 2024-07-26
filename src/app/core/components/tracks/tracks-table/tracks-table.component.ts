import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TracksTableService } from '../../../services/tracks/table/tracks-table.service';
import { TracksTableRowComponent } from '../tracks-table-row/tracks-table-row.component';
import { TracksTablePlaceholderRowComponent } from '../tracks-table-placeholder-row/tracks-table-placeholder-row.component';
import { QueueService } from '../../../services/queue/base/queue.service';
import { NoResultsComponent } from '../../../../shared/components/no-results/no-results.component';

@Component({
  selector: 'app-tracks-table',
  standalone: true,
  imports: [TracksTableRowComponent, TracksTablePlaceholderRowComponent, NoResultsComponent],
  templateUrl: './tracks-table.component.html',
  styleUrl: './tracks-table.component.scss'
})
export class TracksTableComponent implements OnInit{

  constructor(
    public tracksTableService: TracksTableService,
    private queueService: QueueService
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
}
