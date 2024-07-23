import { Component, Input } from '@angular/core';
import { IArtist } from '../../../interfaces/artist/i-artist';

@Component({
  selector: 'app-artist-small-row-item',
  standalone: true,
  imports: [],
  templateUrl: './artist-small-row-item.component.html',
  styleUrl: './artist-small-row-item.component.scss'
})
export class ArtistSmallRowItemComponent {

  @Input() public artist: IArtist = {} as IArtist;
}
