import { Component, Input, OnInit } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LikedTracksService } from '../../../core/user/services/liked-tracks/liked-tracks.service';
import { UserPlaylistsService } from '../../../core/user/services/playlists/user-playlists.service';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-navigation-link-item',
  standalone: true,
  imports: [MatIconModule, RouterLink, MatTooltip, RouterLinkActive, MatIcon],
  templateUrl: './navigation-link-item.component.html',
  styleUrl: './navigation-link-item.component.scss'
})
export class NavigationLinkItemComponent implements OnInit {
 
  constructor(
    public likedTracksService: LikedTracksService,
    public userPlaylistsService: UserPlaylistsService
  ) {}

  @Input() public title: string = "";
  @Input() public routePath: string | null = null;
  @Input() public icon: string = "";

  public tooltip: string = "";

  ngOnInit(): void {
    this.setTooltip();
  }

  setTooltip(): void {
    switch(this.title) {
      case "Liked songs": {
        this.tooltip = "Number of liked tracks"
      } break;
      case "My library": {
        this.tooltip = "Number of playlists"
      }
    };
  }
}
