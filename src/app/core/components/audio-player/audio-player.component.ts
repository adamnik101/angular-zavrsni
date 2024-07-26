import { Component, effect, ElementRef, Injector, OnInit, signal, ViewChild } from '@angular/core';
import { QueueService } from '../../services/queue/base/queue.service';
import { ITrack } from '../../interfaces/tracks/i-track';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { FormatDurationFromSecondsPipe } from "../../../shared/pipes/format-duration-from-seconds.pipe";
import { AudioService } from '../../services/audio/audio.service';
import { MatTooltip } from '@angular/material/tooltip';
import { Repeat } from '../../services/audio/enums/repeat';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { LikedTracksService } from '../../user/services/liked-tracks/liked-tracks.service';
import { AlertService } from '../../../shared/services/alert/alert.service';
import { TracksTableService } from '../../services/tracks/table/tracks-table.service';
import { QueueComponent } from '../queue/queue.component';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [RouterLink, MatIcon, MatIconButton, MatSlider, MatSliderThumb,
    FormatDurationFromSecondsPipe, MatTooltip, MatIconButton,
    MatProgressSpinner, QueueComponent],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.scss'
})
export class AudioPlayerComponent implements OnInit{

  constructor(
    public queueService: QueueService,
    public audioService: AudioService,
    private likedTracksService: LikedTracksService,
    private alertService: AlertService,
    private tracksTableService: TracksTableService,
  ) {
    effect(() => {
      const currentTrack = this.queueService.getCurrentTrack();
      if(currentTrack) {
        console.log("play")
        this.setCurrentTrack(currentTrack);
      }
    })
  }

  public track: ITrack | null = null;
  public repeatEnum = Repeat;

  ngOnInit(): void {
    this.track = this.queueService.getCurrentTrack();  
  }

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
    this.audioService.play();
  }

  skipNext(): void {
    this.queueService.setQueueNextIndex();
    this.audioService.play();
  }

  onDragStart(event: any): void {
    console.log(event)
  }

  onSliderChange(value: any): void {
    this.audioService.seekTo(value);
  }

  onDragEnd(event: any): void {
    console.log(event);
  }

  toggleShuffle(): void {
    this.audioService.toggleShuffle();
  }

  toggleRepeat(): void {
    this.audioService.toggleRepeat();
  }

  formatTime(value: number) {
    const seconds: number = Math.floor(value / 1000);
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;

    const formattedMinutes: string = minutes < 10 ? '0' + minutes : String(minutes);
    const formattedSeconds: string = remainingSeconds < 10 ? '0' + remainingSeconds : String(remainingSeconds);

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  onVolumeInput(volume: string): void {
    this.audioService.audio.volume = +volume;
  }

  toggleVolume(event: any): void {
    const muted = this.audioService.audio.muted;
    
    if(!muted) {
     this.audioService.audio.muted = true;
      return;
    }

    this.audioService.audio.muted = false;
  }

  addToLiked(event: any): void {
    const id = this.track ? this.track.id : null;
    if(id) {
      this.likedTracksService.addToLiked(id).subscribe({
        next: (response) => {

        },
        error: (err) => {
         
        }
      })
    }
  }
  
  removeFromLiked(event: any): void {
    const id = this.track ? this.track.id : null;
    if(id) {
      this.likedTracksService.removeFromLiked(id).subscribe({
        next: (data) => {

        },
        error: (err) => {
          
        }
      });
    }
  }

  toggleQueue(event: any): void {
    this.queueService.toggleQueue();
  }
  
}
