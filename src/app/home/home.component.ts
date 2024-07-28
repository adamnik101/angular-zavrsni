import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HomeService } from './services/api/home.service';
import { UserPlaylistsService } from '../core/user/services/playlists/user-playlists.service';
import { SpinnerFunctions } from '../core/static/spinner-functions';
import { SectionHeaderComponent } from '../core/components/section-header/section-header.component';
import { TracksTableService } from '../core/services/tracks/table/tracks-table.service';
import { TracksTableComponent } from '../core/components/tracks/tracks-table/tracks-table.component';
import { AlbumCardComponent } from '../core/components/albums/album-card/album-card.component';
import { SlicePipe } from '@angular/common';
import { GenreCardComponent } from '../core/components/genres/genre-card/genre-card.component';
import { IGenre } from '../core/interfaces/genre/i-genre';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SectionHeaderComponent, TracksTableComponent, AlbumCardComponent, SlicePipe, GenreCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{

  constructor(
    private apiService: HomeService,
    public playlistsService: UserPlaylistsService,
    private tracksTableService: TracksTableService
  ) { }

  public newReleases = {
    albums: [],
    tracks: []
  };

  public genres: IGenre[] = [];

  @ViewChild('genreBackground') public genreBackgroundEl!: ElementRef;

  ngOnInit(): void {
    this.getFromInitialRequests();
  }

  getFromInitialRequests(): void {
    SpinnerFunctions.showSpinner();
    this.apiService.getNewReleases().subscribe({
      next: (response) => {
        if(response) {

          this.newReleases = {
            albums: response.albums.data,
            tracks: response.tracks.data,
          };

          this.genres = response.genres.data;

          this.tracksTableService.setTracks(this.newReleases.tracks);
          SpinnerFunctions.hideSpinner();
        }
      }
    });
  }

  applyBackground(genre: IGenre): void {
    this.genreBackgroundEl.nativeElement.style.backgroundColor = genre.hex_color + '50';
  }

  ngOnDestroy(): void {
    this.tracksTableService.resetTracks();
  }
}
