import { Component, Input, OnInit } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LikedTracksService } from '../../../core/user/services/liked-tracks/liked-tracks.service';
import { UserPlaylistsService } from '../../../core/user/services/playlists/user-playlists.service';
import { MatTooltip } from '@angular/material/tooltip';
import { EnumActions } from '../../../shared/enums/enum-actions';
import { MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navigation-link-item',
  standalone: true,
  imports: [MatIconModule, RouterLink, MatTooltip, RouterLinkActive, MatIcon, MatIconButton, MatMiniFabButton],
  templateUrl: './navigation-link-item.component.html',
  styleUrl: './navigation-link-item.component.scss'
})
export class NavigationLinkItemComponent implements OnInit {
 
  constructor(
    public likedTracksService: LikedTracksService,
    public userPlaylistsService: UserPlaylistsService,
    private matDialog: MatDialog
  ) {}

  @Input() public title: string = "";
  @Input() public routePath: string | null = null;
  @Input() public icon: string = "";
  @Input() public action: any | undefined = undefined;

  public tooltip: string = "";

  public enumActions = EnumActions;

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

  create(event: any, dialogConfig: any): void {
    event.stopPropagation();  
    event.preventDefault();  
    this.matDialog.open(dialogConfig.component, dialogConfig.dimensions);
  }
}
