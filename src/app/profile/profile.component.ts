import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { TracksTableComponent } from '../core/components/tracks/tracks-table/tracks-table.component';
import { UserPlaylistsService } from '../core/user/services/playlists/user-playlists.service';
import { UserArtistFollowingsService } from '../core/user/services/artists/user-artist-followings.service';
import { UserAlbumLikesService } from '../core/user/services/albums/user-album-likes.service';
import { SectionHeaderComponent } from '../core/components/section-header/section-header.component';
import { PlaylistCardComponent } from '../core/components/playlists/playlist-card/playlist-card.component';
import { SlicePipe } from '@angular/common';
import { AlbumCardComponent } from '../core/components/albums/album-card/album-card.component';
import { ArtistCardComponent } from '../core/components/artists/artist-card/artist-card.component';
import { UserService } from '../core/user/services/user/user.service';
import { DominantColorService } from '../shared/services/dominant-color/dominant-color.service';
import { SmallRoundDividerComponent } from '../shared/components/small-round-divider/small-round-divider.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TracksTableComponent, SectionHeaderComponent, PlaylistCardComponent, AlbumCardComponent, ArtistCardComponent, SlicePipe,
    SmallRoundDividerComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements AfterViewInit{

  constructor(
    public userService: UserService,
    public userPlaylistsService: UserPlaylistsService,
    public userArtistFollowingsService: UserArtistFollowingsService,
    public userAlbumLikesService: UserAlbumLikesService,
    private dominantColorService: DominantColorService
  ) {}

  @ViewChild('back') private back: ElementRef = {} as ElementRef;
  @ViewChild('image') private image: ElementRef = {} as ElementRef;
  @ViewChild('canvas') private canvas: ElementRef = {} as ElementRef;
  
  ngAfterViewInit(): void {
      this.image.nativeElement.onload = () => {
        const color = this.dominantColorService.getDominantColorFromImage(this.image.nativeElement, this.canvas.nativeElement);
        
        console.log(color)
        this.back.nativeElement.style.background = `linear-gradient(to top, #070707 0%, #07070795 20%, ${color} 100%)`
      }
  }
}
