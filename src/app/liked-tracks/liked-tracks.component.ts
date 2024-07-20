import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { TracksTableService } from '../core/services/tracks/table/tracks-table.service';
import { TracksTableComponent } from '../core/components/tracks/tracks-table/tracks-table.component';
import { LikedTracksService } from '../core/user/services/liked-tracks/liked-tracks.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { skip, take } from 'rxjs';
import { SpinnerFunctions } from '../core/static/spinner-functions';

@Component({
  selector: 'app-liked-tracks',
  standalone: true,
  imports: [TracksTableComponent],
  templateUrl: './liked-tracks.component.html',
  styleUrl: './liked-tracks.component.scss'
})
export class LikedTracksComponent implements OnInit, OnDestroy {

  constructor(
    private tracksTableService: TracksTableService,
    private likedTracksService: LikedTracksService,
    private injector: Injector
  ) {}

  ngOnInit(): void {
    const tracks$ = toObservable(this.likedTracksService.likedTracks, {
      injector: this.injector
    });

    tracks$.subscribe({
      next: (data) => {
        this.tracksTableService.setTracks(data);
      }
    });
  }

  ngOnDestroy(): void {
    this.tracksTableService.resetTracks();
  }

}
