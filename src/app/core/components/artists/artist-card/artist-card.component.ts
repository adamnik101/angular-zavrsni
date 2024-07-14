import { Component, Input } from '@angular/core';
import { IArtist } from '../../../interfaces/artist/i-artist';
import { RouterLink } from '@angular/router';
import { PlayAllButtonComponent } from '../../play-all-button/play-all-button.component';
import { ArtistsService } from '../../../services/artists/base/artists.service';

@Component({
  selector: 'app-artist-card',
  standalone: true,
  imports: [RouterLink, PlayAllButtonComponent],
  templateUrl: './artist-card.component.html',
  styleUrl: './artist-card.component.scss'
})
export class ArtistCardComponent {

  constructor(
    public apiService: ArtistsService
  ) {}

  @Input() public artist: IArtist = {} as IArtist;

  playAll(event: any): void {
    console.log(event)
  }
}
