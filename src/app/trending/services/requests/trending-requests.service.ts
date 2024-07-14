import { Injectable } from '@angular/core';
import { ArtistsTrendingService } from '../../../core/services/artists/trending/artists-trending.service';
import { AlbumsTrendingService } from '../../../core/services/albums/trending/albums-trending.service';
import { forkJoin, Observable } from 'rxjs';
import { IAlbum } from '../../../core/interfaces/album/i-album';
import { IArtist } from '../../../core/interfaces/artist/i-artist';
import { TracksTrendingService } from '../../../core/services/tracks/trending/tracks-trending.service';

@Injectable({
  providedIn: 'root'
})
export class TrendingRequestsService {

  constructor(
    private artistsTrendingService: ArtistsTrendingService,
    private albumsTrendingService: AlbumsTrendingService,
    private tracksTrendingService: TracksTrendingService
  ) { }

  getAllTrendingData() {
    const requests = [
      this.albumsTrendingService.getAll<IAlbum[]>(),
      this.artistsTrendingService.getAll<IArtist[]>(),
      this.tracksTrendingService.getAll<any[]>()
    ];

    return forkJoin({
      albums: requests[0],
      artists: requests[1],
      tracks: requests[2]
    });
  }
}
