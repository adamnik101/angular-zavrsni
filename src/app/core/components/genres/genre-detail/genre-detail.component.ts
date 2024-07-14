import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GenreService } from '../../../services/genre/base/genre.service';
import { IGenre, IGenreDetail } from '../../../interfaces/genre/i-genre';
import { IApiResponse } from '../../../../shared/interfaces/i-api-response';
import { SpinnerFunctions } from '../../../static/spinner-functions';
import { PlaylistCardComponent } from '../../playlists/playlist-card/playlist-card.component';
import { PlaceholderCardComponent } from '../../placeholder-card/placeholder-card.component';

@Component({
  selector: 'app-genre-detail',
  standalone: true,
  imports: [PlaylistCardComponent, PlaceholderCardComponent],
  templateUrl: './genre-detail.component.html',
  styleUrl: './genre-detail.component.scss'
})
export class GenreDetailComponent implements OnInit, OnDestroy{

  constructor(
    private route: ActivatedRoute,
    private genreService: GenreService
  ) {}

  public genre: IGenreDetail = {} as IGenreDetail;

  private id: string | null = null;
  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
      this.getGenre(this.id);
    }
  }

  getGenre(id: string): void {
    SpinnerFunctions.showSpinner();
      this.genreService.get<IGenreDetail>(id).subscribe({
        next: (data: IApiResponse<IGenreDetail>) => {
          this.genre = data.data;

          SpinnerFunctions.hideSpinner();
        }
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
