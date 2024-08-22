import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ArtistsService } from '../../../services/artists/base/artists.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IArtist } from '../../../interfaces/artist/i-artist';
import { SpinnerFunctions } from '../../../static/spinner-functions';
import { NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { SmallRoundDividerComponent } from '../../../../shared/components/small-round-divider/small-round-divider.component';
import { TracksTableComponent } from "../../tracks/tracks-table/tracks-table.component";
import { TracksTableService } from '../../../services/tracks/table/tracks-table.service';
import { UserArtistFollowingsService } from '../../../user/services/artists/user-artist-followings.service';
import { AlbumCardComponent } from '../../albums/album-card/album-card.component';
import { SectionHeaderComponent } from '../../section-header/section-header.component';
import { SmallHeaderComponent } from '../../small-header/small-header.component';
import { LikedTracksService } from '../../../user/services/liked-tracks/liked-tracks.service';
import { MatFabButton } from '@angular/material/button';
import { AlertService } from '../../../../shared/services/alert/alert.service';

@Component({
  selector: 'app-artist-detail',
  standalone: true,
  imports: [NgOptimizedImage, MatIcon, MatTooltip, SmallRoundDividerComponent, TracksTableComponent, AlbumCardComponent,
    SectionHeaderComponent, SmallHeaderComponent, MatFabButton],
  templateUrl: './artist-detail.component.html',
  styleUrl: './artist-detail.component.scss'
})
export class ArtistDetailComponent implements OnInit, OnDestroy{

  constructor(
    private artistsService: ArtistsService,
    private route: ActivatedRoute,
    private tracksTableService: TracksTableService,
    public userArtistsFollowingsService: UserArtistFollowingsService,
    private likedTracksService: LikedTracksService,
    private alertService: AlertService
  ) {}

  public artist: IArtist = {} as IArtist;
  
  @ViewChild('back') private back: ElementRef = {} as ElementRef;

  private subscription: Subscription = new Subscription();

  public isFollowing: boolean = false;

  ngOnInit(): void {
    this.subscription.add(
      this.route.paramMap.subscribe({
        next: (data) => {
          const id = data.get('id');

          if(id) {
            this.isFollowing = false;

            SpinnerFunctions.showSpinner();
            this.subscription.add(
              this.artistsService.get<IArtist>(id).subscribe({
                next: (response) => {
                  this.artist = response.data;
                  this.back.nativeElement.style.backgroundImage = `url(${this.artist.cover})`;

                  this.artist.tracks.forEach(track => {
                    track['liked'] = this.likedTracksService.likedTracks().some(t => t.id === track.id);
                  });

                  const isFollowing = this.userArtistsFollowingsService.artists().findIndex(artist => artist.id === this.artist.id);
                  if(isFollowing !== -1) {
                    this.isFollowing = true;
                  }

                  this.tracksTableService.setTracks(this.artist.tracks);
                  SpinnerFunctions.hideSpinner();
                }
              })
            );
          };

        }
      })
    );
  }

  followArtist(): void {
    this.userArtistsFollowingsService.followArtist(this.artist.id).subscribe({
      next: (data) => {
        this.userArtistsFollowingsService.getAll<IArtist[]>().subscribe({
          next: (response) => {
            this.isFollowing = true;
            this.userArtistsFollowingsService.setArtists(response.data);
            this.alertService.showDefaultMessage("Added to your followings.")
          }
        });
      }
    })
  }

  unfollowArtist(): void {
    this.userArtistsFollowingsService.unfollowArtist(this.artist.id).subscribe({
      next: (data) => {
        this.userArtistsFollowingsService.getAll<IArtist[]>().subscribe({
          next: (response) => {
            this.isFollowing = false;
            this.userArtistsFollowingsService.setArtists(response.data);
            this.alertService.showDefaultMessage("Removed from your followings.")
          }
        });
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
