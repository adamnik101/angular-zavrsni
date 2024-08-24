import { Component, effect, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AudioPlayerComponent } from "../core/components/audio-player/audio-player.component";
import { QueueComponent } from '../core/components/queue/queue.component';
import { QueueService } from '../core/services/queue/base/queue.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { UserService } from '../core/user/services/user/user.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MatToolbarModule, HeaderComponent, SidenavComponent, AudioPlayerComponent, AudioPlayerComponent, QueueComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  animations: [
    trigger('slideInOut', [
      state('in', style({ height: '100px' })),
      state('out', style({ height: '0px'})),
      transition('in => out', animate('300ms ease-in-out')),
      transition('out => in', animate('300ms ease-in-out'))
    ])
  ]
})
export class LayoutComponent implements OnInit {

  constructor(
    public queueService: QueueService,
    public userService: UserService
  ) {
    effect(() => {
      const currentTrack = this.queueService.getCurrentTrack();
      if(currentTrack) {
        console.log("show audio player");

        this.showAudioPlayer = true;
      }
    });
  }

  showAudioPlayer: boolean = false;

  ngOnInit(): void {
    
  }
}
