import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AudioPlayerComponent } from "../core/components/audio-player/audio-player.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MatToolbarModule, HeaderComponent, SidenavComponent, AudioPlayerComponent, AudioPlayerComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
