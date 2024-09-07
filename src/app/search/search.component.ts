import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from './services/api/search.service';
import { ActivatedRoute } from '@angular/router';
import { ISearchResult } from './interfaces/i-search-result';
import { NoResultsComponent } from '../shared/components/no-results/no-results.component';
import { Subscription } from 'rxjs';
import { SpinnerFunctions } from '../core/static/spinner-functions';
import { AlbumCardComponent } from '../core/components/albums/album-card/album-card.component';
import { ArtistCardComponent } from '../core/components/artists/artist-card/artist-card.component';
import { SectionHeaderComponent } from "../core/components/section-header/section-header.component";
import { TracksTableComponent } from "../core/components/tracks/tracks-table/tracks-table.component";
import { TracksTableService } from '../core/services/tracks/table/tracks-table.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NoResultsComponent, AlbumCardComponent, ArtistCardComponent, SectionHeaderComponent, TracksTableComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit, OnDestroy{

  constructor(
    public searchService: SearchService,
    private route: ActivatedRoute,
    private tracksTableService: TracksTableService
  ) { }

  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.getQueryParam();
    this.trackSearchQuery();
  }

  getQueryParam(): void {
    const query = this.route.snapshot.queryParamMap.get("query");
    if(query) {
      this.searchService.query.next(query);
    }
  }

  trackSearchQuery(): void {
    this.subscription.add(
      this.searchService.query.subscribe({
        next: (data) => {
          this.performSearch(data);
        }
      })
    );
  }

  performSearch(query: string): void {
    SpinnerFunctions.showSpinner();
    this.searchService.getWithQueryParams<ISearchResult>([`query=${query}`]).subscribe({
      next: (response) => {
        this.searchService.results.set(response.data);

        if(this.searchService.results()?.tracks.total) {
          this.tracksTableService.setTracks(this.searchService.results()?.tracks.data!);
        }
        
        SpinnerFunctions.hideSpinner();
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
