import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IAlbum } from '../../../interfaces/album/i-album';

@Component({
  selector: 'app-album-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './album-card.component.html',
  styleUrl: './album-card.component.scss'
})
export class AlbumCardComponent {

  @Input() public album: IAlbum = {} as IAlbum;
  public num = new Number();
}
