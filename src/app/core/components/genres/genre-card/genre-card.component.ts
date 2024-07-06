import { Component, Input } from '@angular/core';
import { IGenre } from '../../../interfaces/genre/i-genre';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-genre-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './genre-card.component.html',
  styleUrl: './genre-card.component.scss'
})
export class GenreCardComponent {

  @Input() public genre: IGenre = {} as IGenre;
}
