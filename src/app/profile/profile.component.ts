import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { RecentlyPlayedService } from '../core/user/services/recently-played/recently-played.service';
import { TracksTableService } from '../core/services/tracks/table/tracks-table.service';
import { ITrack } from '../core/interfaces/tracks/i-track';
import { SpinnerFunctions } from '../core/static/spinner-functions';
import { NoResultsComponent } from '../shared/components/no-results/no-results.component';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { LikedTracksService } from '../core/user/services/liked-tracks/liked-tracks.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TracksTableComponent, SectionHeaderComponent, PlaylistCardComponent, AlbumCardComponent, ArtistCardComponent, SlicePipe,
    SmallRoundDividerComponent, TracksTableComponent, NoResultsComponent, MatMiniFabButton, MatIcon, MatTooltip
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, AfterViewInit, OnDestroy{

  constructor(
    public userService: UserService,
    public userPlaylistsService: UserPlaylistsService,
    public userArtistFollowingsService: UserArtistFollowingsService,
    public userAlbumLikesService: UserAlbumLikesService,
    private dominantColorService: DominantColorService,
    private recentlyPlayedService: RecentlyPlayedService,
    private tracksTableService: TracksTableService,
    private likedTracksService: LikedTracksService
  ) {}

  public recent: boolean = false;

  @ViewChild('back') private back: ElementRef = {} as ElementRef;
  @ViewChild('image') private image: ElementRef = {} as ElementRef;
  @ViewChild('canvas') private canvas: ElementRef = {} as ElementRef;
  
  ngOnInit(): void {
    this.getRecentlyPlayedTracks();
  }

  getRecentlyPlayedTracks(): void {
    SpinnerFunctions.showSpinner();
    this.recentlyPlayedService.getAll<ITrack[]>().subscribe({
      next: (response) => {
        if(response) {
          if(response.data.length) {
            const tracks = response.data;
            
            tracks.forEach(track => {
              track['liked'] = this.likedTracksService.likedTracks().some(t => t.id === track.id);  
            });

            this.tracksTableService.setTracks(tracks);
            this.recent = true;
          }
        }

        SpinnerFunctions.hideSpinner();
      }
    })
  }

  ngAfterViewInit(): void {
    if(this.userService.user()?.cover) {
      this.image.nativeElement.onload = () => {
        const color = this.dominantColorService.getDominantColorFromImage(this.image.nativeElement, this.canvas.nativeElement);
        
        this.back.nativeElement.style.background = `linear-gradient(to top, #070707 0%, #07070795 20%, ${color} 100%)`
      }
    } else {
      this.back.nativeElement.style.background = `linear-gradient(to top, #070707 0%, #07070795 20%, #212121 100%)`
    }
  }

  ngOnDestroy(): void {
    this.tracksTableService.resetTracks();
  }
}
