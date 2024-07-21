import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IAlbum } from '../../../interfaces/album/i-album';
import { PlayAllButtonComponent } from '../../play-all-button/play-all-button.component';
import { AlbumsService } from '../../../services/albums/base/albums.service';
import { QueueService } from '../../../services/queue/base/queue.service';

@Component({
  selector: 'app-album-card',
  standalone: true,
  imports: [RouterLink, PlayAllButtonComponent],
  templateUrl: './album-card.component.html',
  styleUrl: './album-card.component.scss'
})
export class AlbumCardComponent {

  constructor(
    public apiService: AlbumsService,
    private queueService: QueueService
  ) {}

  @Input() public album: IAlbum = {} as IAlbum;
  public num = new Number();

  playAll(event: any): void {
    
  }
}
