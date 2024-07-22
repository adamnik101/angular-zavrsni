import { Component, ElementRef, EventEmitter, Input, Output, signal, ViewChild } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ApiService } from '../../../shared/base-logic/api/api.service';
import { QueueService } from '../../services/queue/base/queue.service';
import { PlayingFromService } from '../../services/playing-from/playing-from.service';
import { AudioService } from '../../services/audio/audio.service';
import { NgClass } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-play-all-button',
  standalone: true,
  imports: [MatIcon, MatIconButton, NgClass, MatTooltip, MatProgressSpinner],
  templateUrl: './play-all-button.component.html',
  styleUrl: './play-all-button.component.scss'
})
export class PlayAllButtonComponent {

  constructor(
    private queueService: QueueService,
    public playingFromService: PlayingFromService,
    public audioService: AudioService
  ) {}

  @Input({required: true}) public apiService!: ApiService<any>;
  @Input({required: true}) public id: string = "";

  @Output() public onPlay: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('togglePlayButton') public togglePlayButton!: ElementRef;

  public paused = signal<boolean>(false);

  play(event: any): void {
    this.onPlay.emit(true);
    this.apiService.get<any>(this.id).subscribe({
      next: (response) => {
        if(response.data.hasOwnProperty('tracks')) {
          this.queueService.setQueue(response.data.tracks);
          this.queueService._queueIndex.set(0);
          this.playingFromService.playingFrom.set(this.id);
          
          if(this.playingFromService.playingFrom() && this.playingFromService.playingFrom() === this.id) {
            this.togglePlayButton.nativeElement.classList.add('show-play-all');
          }
        }
      }
    });
  }

  continue(event: any): void {
    this.audioService.continue();
  }

  pause(event: any): void {
    this.audioService.pause();
    this.paused.set(true);
    if(this.playingFromService.playingFrom() && this.playingFromService.playingFrom() === this.id) {
      this.togglePlayButton.nativeElement.classList.add('show-play-all');
    }
  }
}
