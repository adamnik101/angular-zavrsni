import { Component, OnInit } from '@angular/core';
import { ExploreRequestsService } from './services/requests/explore-requests.service';
import { GenreCardComponent } from '../core/components/genres/genre-card/genre-card.component';
import { IGenre } from '../core/interfaces/genre/i-genre';
import { IApiResponse } from '../shared/interfaces/i-api-response';
import { SpinnerFunctions } from '../core/static/spinner-functions';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [GenreCardComponent],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss'
})
export class ExploreComponent implements OnInit {

  constructor(
    private exploreRequestsService: ExploreRequestsService
  ) {}

  public genres: IGenre[] = [];

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData(): void {
    SpinnerFunctions.showSpinner();
    this.exploreRequestsService.getAllData().subscribe({
      next: (data) => {
        this.genres = (data.genres as IApiResponse<IGenre[]>).data;
        SpinnerFunctions.hideSpinner();
      }
    })
  }
}
