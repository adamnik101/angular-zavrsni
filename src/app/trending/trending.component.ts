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
import { TracksTableService } from '../core/services/tracks/table/tracks-table.service';
import { TracksTableComponent } from "../core/components/tracks/tracks-table/tracks-table.component";
import { LikedTracksService } from '../core/user/services/liked-tracks/liked-tracks.service';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [MatIcon, AlbumCardComponent, ArtistCardComponent, TracksTableComponent, PlaceholderCardComponent, TracksTableComponent],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.scss'
})
export class TrendingComponent implements OnInit {

  constructor(
    private trendingRequestsService: TrendingRequestsService,
    private tracksTableService: TracksTableService,
    private likedTracksService: LikedTracksService
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

        this.trending.tracks.forEach(track => {
          track['liked'] = this.likedTracksService.likedTracks().some(t => t.id === track.id);
        });
        
        this.tracksTableService.setTracks(this.trending.tracks);

        SpinnerFunctions.hideSpinner();
      }
    })
  }
}
