import { Injectable, signal } from '@angular/core';
import { ITrack } from '../../../interfaces/tracks/i-track';

@Injectable({
  providedIn: 'root'
})
export class TracksTableService {

  private _tracks = signal<ITrack[]>([]);

  public setTracks(tracks: ITrack[]): void {
    this._tracks.set(tracks);
  }

  public getTracks(): ITrack[] {
    return this._tracks();
  }

  public resetTracks(): void {
    this._tracks.set([]);
  }
}
