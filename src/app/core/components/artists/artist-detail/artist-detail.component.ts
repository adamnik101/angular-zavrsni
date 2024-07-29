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

@Component({
  selector: 'app-artist-detail',
  standalone: true,
  imports: [NgOptimizedImage, MatIcon, MatTooltip, SmallRoundDividerComponent, TracksTableComponent, AlbumCardComponent,
    SectionHeaderComponent, SmallHeaderComponent],
  templateUrl: './artist-detail.component.html',
  styleUrl: './artist-detail.component.scss'
})
export class ArtistDetailComponent implements OnInit, OnDestroy{

  constructor(
    private artistsService: ArtistsService,
    private route: ActivatedRoute,
    private tracksTableService: TracksTableService,
    public userArtistsFollowingsService: UserArtistFollowingsService
  ) {}

  public artist: IArtist = {} as IArtist;
  
  @ViewChild('back') private back: ElementRef = {} as ElementRef;

  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(
      this.route.paramMap.subscribe({
        next: (data) => {
          const id = data.get('id');

          if(id) {
            SpinnerFunctions.showSpinner();
            this.subscription.add(
              this.artistsService.get<IArtist>(id).subscribe({
                next: (response) => {
                  this.artist = response.data;
                  this.back.nativeElement.style.backgroundImage = `url(${this.artist.cover})`;
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
