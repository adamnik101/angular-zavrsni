import { Component, effect } from '@angular/core';
import { QueueService } from '../../services/queue/base/queue.service';
import { ITrack } from '../../interfaces/tracks/i-track';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { FormatDurationFromSecondsPipe } from "../../../shared/pipes/format-duration-from-seconds.pipe";
import { AudioService } from '../../services/audio/audio.service';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [RouterLink, MatIcon, MatIconButton, MatSlider, MatSliderThumb, FormatDurationFromSecondsPipe],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.scss'
})
export class AudioPlayerComponent {

  constructor(
    public queueService: QueueService,
    public audioService: AudioService
  ) {
    effect(() => {
      const currentTrack = this.queueService.getCurrentTrack();
      if(currentTrack) {
        console.log("play")
        this.setCurrentTrack(currentTrack);
        this.audioService.play();
      }
    })
  }

  public track: ITrack | null = null;

  setCurrentTrack(track: ITrack): void {
    this.track = track;
  }

  continue(): void {
    this.audioService.continue();
  }

  pause(): void {
    this.audioService.pause();
  }

  skipPrevious(): void {
    this.queueService.setQueuePreviousIndex();
  }

  skipNext(): void {
    this.queueService.setQueueNextIndex();
  }

  onDragStart(event: any): void {
    console.log(event)
  }

  onDragEnd(event: any): void {
    console.log(event);
  }
}
