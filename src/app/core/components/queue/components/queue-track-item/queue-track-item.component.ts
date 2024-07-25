import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITrack } from '../../../../interfaces/tracks/i-track';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-queue-track-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './queue-track-item.component.html',
  styleUrl: './queue-track-item.component.scss'
})
export class QueueTrackItemComponent {

  @Input() public track: ITrack = {} as ITrack;
  @Output() public closeQueue: EventEmitter<any> = new EventEmitter();

  close(): void {
    this.closeQueue.emit(this.track);
  }
}
