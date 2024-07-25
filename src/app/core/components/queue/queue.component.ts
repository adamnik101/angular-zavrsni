import { Component, effect, ElementRef, Injector, Input, OnInit, signal, ViewChild } from '@angular/core';
import { QueueService } from '../../services/queue/base/queue.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { DominantColorService } from '../../../shared/services/dominant-color/dominant-color.service';
import { ITrack } from '../../interfaces/tracks/i-track';
import { QueueTrackItemComponent } from './components/queue-track-item/queue-track-item.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-queue',
  standalone: true,
  imports: [MatMiniFabButton, MatIcon, MatTooltip, QueueTrackItemComponent, RouterLink],
  templateUrl: './queue.component.html',
  styleUrl: './queue.component.scss',
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: "translateY(0)" })),
      state('out', style({ transform: 'translateY(150%)'})),
      transition('in => out', animate('300ms ease-in-out')),
      transition('out => in', animate('300ms ease-in-out'))
    ])
  ]
})
export class QueueComponent implements OnInit {

  constructor(
    public queueService: QueueService,
    private injector: Injector,
    private dominantColorService: DominantColorService
  ) {
    effect(() => {
      const currentTrack = this.queueService.getCurrentTrack();
      if(currentTrack) {
        this.track = currentTrack;

        if(this.image) {
          this.image.nativeElement.onload = () => {
            this.color = this.dominantColorService.getDominantColorFromImage(this.image.nativeElement, this.myCanvas.nativeElement, 1);
            
            this.queueWrapper.nativeElement.style.backgroundColor = this.color;
          }
        }
      }
    })
  }

  public track: ITrack | null = null;
  public features: string[] = [];

  private color: string = "";
  @ViewChild('queueWrapper') public queueWrapper!: ElementRef;
  @ViewChild('myCanvas', {static: false}) myCanvas!: ElementRef;
  @ViewChild('image') image!: ElementRef;

  ngOnInit(): void {
    this.trackQueue();
  }

  trackQueue(): void {
    const queue$ = toObservable(this.queueService.showQueue, {
      injector: this.injector
    });

    queue$.subscribe({
      next: (data) => {
        console.log(data);
      }
    })
  }

  close(): void {
    this.queueService.showQueue.set(false);
  }
}
