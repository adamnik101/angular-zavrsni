import { Injectable, signal } from '@angular/core';
import { QueueService } from '../queue/base/queue.service';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor(
    private queueService: QueueService
  ) { }

  public audio: HTMLAudioElement = new Audio();
  public currentTime = signal<string>("");
  public isPlaying = signal<boolean>(false);

  play(): void {
    const track = this.queueService.getCurrentTrack();
    
    if(track) {
      this.audio.src = track.path;
      console.log('play now...')
      setTimeout(() => {
        this.audio.play().then(() => {
          this.isPlaying.set(true);
          this.audio.ontimeupdate = (ev) => {
            this.currentTime.set(this.audio.currentTime.toString());
          }
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


}
