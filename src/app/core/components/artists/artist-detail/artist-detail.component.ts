import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-artist-detail',
  standalone: true,
  imports: [NgOptimizedImage, MatIcon, MatTooltip, SmallRoundDividerComponent, TracksTableComponent],
  templateUrl: './artist-detail.component.html',
  styleUrl: './artist-detail.component.scss'
})
export class ArtistDetailComponent implements OnInit{

  constructor(
    private artistsService: ArtistsService,
    private route: ActivatedRoute,
    private tracksTableService: TracksTableService
  ) {}

  public artist: IArtist = {} as IArtist;
  
  @ViewChild('back') private back: ElementRef = {} as ElementRef;

  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    const id: string | null = this.getId();

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
    }
  }

  private getId(): string | null {
    return this.route.snapshot.paramMap.get('id');
  }
}
