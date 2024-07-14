import { Injectable, signal } from '@angular/core';
import { ITrack } from '../../../interfaces/tracks/i-track';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor() { }

  public _queue = signal<ITrack[]>([]);
  public _queueIndex = signal<number | null>(null);
  private _from = signal<any>({id: null});

  public setQueue(tracks: ITrack[]): void {
    this._queue.set(tracks);
  }

  public setQueueIndex(index: number): void {
    this._queueIndex.set(index);
  }

  public setFrom(from: any): void {
    this._from.set(from);
  }

  public getQueue(): ITrack[] {
    return this._queue();
  }

  public getQueueIndex(): number | null  {
    return this._queueIndex();
  }

  public getFrom(): any {
    return this._from();
  }


  public resetQueue(): void {
    this._queue.set([]);
  }

  public resetQueueIndex(): void {
    this._queueIndex.set(0);
  }
}
