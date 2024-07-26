import { Injectable, signal } from '@angular/core';
import { QueueService } from '../queue/base/queue.service';
import { Repeat } from './enums/repeat';
import { IRepeat } from '../../interfaces/repeat/i-repeat';
import { ITrack } from '../../interfaces/tracks/i-track';
import { TracksService } from '../tracks/base/tracks.service';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor(
    private queueService: QueueService,
    private tracksService: TracksService
  ) { }

  public audio: HTMLAudioElement = new Audio();
  public currentTime = signal<string>("");
  public isPlaying = signal<boolean>(false);

  public shuffle = signal<boolean>(false);
  public repeat = signal<IRepeat>({repeat: Repeat.DisableRepeat, title: "Enable repeat"});

  public trackIsLoading = signal<boolean>(false);

  public volume: number = 1;

  play(): void {
    const track = this.queueService.getCurrentTrack();
    if(track) {
      this.audio.src = track.path;
      setTimeout(() => {
        this.trackIsLoading.set(true);
        this.audio.play().then(() => {
          this.tracksService.get(track.id).subscribe({
            next: (data) => {
              console.log(data)
            }
          })
          this.trackIsLoading.set(false);
          this.isPlaying.set(true);
          this.onTrackTimeUpdate();
          this.onTrackEnd();
        })
      });
    }
  }

  continue(): void {
    this.audio.play().then(() => {
      this.isPlaying.set(true);
    });
  }
  
  pause(): void {
    this.audio.pause();
    this.isPlaying.set(false);
  }

  toggleShuffle(): void {
    this.shuffle.set(!this.shuffle());
  }

  toggleRepeat(): void {
    switch(this.repeat().repeat) {
      case Repeat.DisableRepeat: {
        this.repeat.set({
          repeat: Repeat.EnableRepeat,
          title: "Enable repeat one"
        });
      } break;
      case Repeat.EnableRepeat: {
        this.repeat.set({
          repeat: Repeat.EnableRepeatOne,
          title: "Disable repeat"
        });
      } break;
      case Repeat.EnableRepeatOne: {
        this.repeat.set({
          repeat: Repeat.DisableRepeat,
          title: "Enable repeat"
        });
      } break;
    }
  }

  seekTo(value: string): void {
    this.audio.currentTime = +value / 1000;
  }

  onTrackTimeUpdate(): void {
    this.audio.ontimeupdate = (ev) => {
      this.currentTime.set(this.audio.currentTime.toString());
    }
  }

  onTrackEnd(): void {
    this.audio.onended = () => {
      this.isPlaying.set(false);
      switch(this.repeat().repeat) {
        case Repeat.EnableRepeatOne: {
          const currentQueueIndex = this.queueService.getQueueIndex();
          if(currentQueueIndex !== null && currentQueueIndex >= 0) {
            this.queueService.setQueueIndex(currentQueueIndex);
            this.play();
          }
        } break;
        case Repeat.EnableRepeat: {
          if(this.shuffle()) {
            this.queueService.shuffleQueueIndex();
            this.play();
          } else {
            this.queueService.setQueueNextIndex();
            this.play();
          }
        } break;
        case Repeat.DisableRepeat: {
          if(this.shuffle()) {
            this.queueService.shuffleQueueIndex();
          }
        }
      }
    }
  }
}
