import { Component, OnDestroy, OnInit } from '@angular/core';
import { MAIN_NAVIGATION_LINKS } from '../../core/consts/main-navigation-links';
import { IMainNavigationLink } from '../../core/interfaces/i-main-navigation-link';
import { NavigationLinkItemComponent } from './navigation-link-item/navigation-link-item.component';
import { MatDividerModule } from '@angular/material/divider';
import { AUTH_NAVIGATION_LINKS } from '../../core/consts/auth-navigation-links';
import { UserService } from '../../core/user/services/user/user.service';
import { USER_NAVIGATION_LINKS } from '../../core/consts/user-navigation-links';
import { CdkAccordion, CdkAccordionItem } from '@angular/cdk/accordion';
import { MatTabsModule } from '@angular/material/tabs';
import { UserPlaylistsService } from '../../core/user/services/playlists/user-playlists.service';
import { PlaylistSmallRowItemComponent } from '../../core/components/playlists/playlist-small-row-item/playlist-small-row-item.component';
import { UserArtistFollowingsService } from '../../core/user/services/artists/user-artist-followings.service';
import { UserAlbumLikesService } from '../../core/user/services/albums/user-album-likes.service';
import { AlbumSmallRowItemComponent } from '../../core/components/albums/album-small-row-item/album-small-row-item.component';
import { ArtistSmallRowItemComponent } from '../../core/components/artists/artist-small-row-item/artist-small-row-item.component';
import { ADMIN_NAVIGATION_LINKS } from '../../core/consts/admin-navigation-links';
import { TrackSelectionService } from '../../core/services/tracks/track-selection.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [NavigationLinkItemComponent, MatDividerModule, CdkAccordion, CdkAccordionItem,
    MatTabsModule, PlaylistSmallRowItemComponent,
    AlbumSmallRowItemComponent, ArtistSmallRowItemComponent, NgClass, AsyncPipe
  ],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.scss'
})
export class LeftSidebarComponent implements OnInit, OnDestroy {

  constructor(
    public userService: UserService,
    public userPlaylistsService: UserPlaylistsService,
    public userArtistsFollowingsService: UserArtistFollowingsService,
    public userAlbumLikesService: UserAlbumLikesService,
    public trackSelectionService: TrackSelectionService
  ) {}
  
  public mainNavigationLinks: IMainNavigationLink[] = MAIN_NAVIGATION_LINKS;
  public authNavigationLinks: IMainNavigationLink[] = AUTH_NAVIGATION_LINKS;
  public userNavigationLinks: IMainNavigationLink[] = USER_NAVIGATION_LINKS;
  public adminNavigationLinks: IMainNavigationLink[] = ADMIN_NAVIGATION_LINKS;

  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.trackSelectionService.isSelectionDragging.subscribe({
      next: (data) => {
        if(!data) {
          console.log('to drop')
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
