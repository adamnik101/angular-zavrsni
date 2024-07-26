import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITrack } from '../../../../interfaces/tracks/i-track';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { QueueService } from '../../../../services/queue/base/queue.service';
import { AudioService } from '../../../../services/audio/audio.service';
import { NgClass } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-queue-track-item',
  standalone: true,
  imports: [RouterLink, MatIcon, MatIconButton, NgClass, MatMiniFabButton, MatTooltip],
  templateUrl: './queue-track-item.component.html',
  styleUrl: './queue-track-item.component.scss'
})
export class QueueTrackItemComponent {

  constructor(
    public queueService: QueueService,
    public audioService: AudioService
  ) {}

  @Input() public track: ITrack = {} as ITrack;
  @Input() public index: number = 0;
  @Output() public closeQueue: EventEmitter<any> = new EventEmitter();

  play(index: number): void {
    this.queueService.setQueueIndex(index);
    this.audioService.play();
  }

  continue(): void {
    this.audioService.continue();
  }

  pause(): void {
    this.audioService.pause();
  }

  close(): void {
    this.closeQueue.emit(this.track);
  }
}
