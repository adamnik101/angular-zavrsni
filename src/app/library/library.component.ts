import { Component } from '@angular/core';
import { UserPlaylistsService } from '../core/user/services/playlists/user-playlists.service';
import { PlaylistCardComponent } from '../core/components/playlists/playlist-card/playlist-card.component';
import { PlaceholderCardComponent } from '../core/components/placeholder-card/placeholder-card.component';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [PlaylistCardComponent, PlaceholderCardComponent],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent {

  constructor(
    public userPlaylistsService: UserPlaylistsService
  ) {}
}
