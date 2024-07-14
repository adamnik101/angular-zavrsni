import { Component, OnInit } from '@angular/core';
import { TrendingRequestsService } from './services/requests/trending-requests.service';
import { MatIcon } from '@angular/material/icon';
import { ITrending } from './interfaces/i-trending';
import { IAlbum } from '../core/interfaces/album/i-album';
import { AlbumCardComponent } from '../core/components/albums/album-card/album-card.component';
import { IArtist } from '../core/interfaces/artist/i-artist';
import { ArtistCardComponent } from '../core/components/artists/artist-card/artist-card.component';
import { SpinnerFunctions } from '../core/static/spinner-functions';
import { PlaceholderCardComponent } from '../core/components/placeholder-card/placeholder-card.component';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [MatIcon, AlbumCardComponent, ArtistCardComponent, PlaceholderCardComponent],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.scss'
})
export class TrendingComponent implements OnInit {

  constructor(
    private trendingRequestsService: TrendingRequestsService
  ) {}

  public albums: IAlbum[] = [];
  public artists: IArtist[] = []

  public trending = <ITrending>{
    albums: [],
    artists: [],
    tracks: []
  };

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData(): void {
    SpinnerFunctions.showSpinner();
    this.trendingRequestsService.getAllTrendingData().subscribe({
      next: (response) => {
        this.trending = {
          albums: response.albums.data,
          artists: response.artists.data,
          tracks: response.tracks.data
        }

        SpinnerFunctions.hideSpinner();
      }
    })
  }
}
