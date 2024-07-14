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

  public setQueueNextIndex(): void {
    let newIndex = this._queueIndex()! + 1;

    if(newIndex == this._queue().length) {
      newIndex = 0;
    }

    this.setQueueIndex(newIndex);
  }

  public setQueuePreviousIndex(): void {
    let newIndex = this._queueIndex()! - 1;
    
    if(newIndex == -1) {
      newIndex = this._queue().length - 1;
    }
    
    this.setQueueIndex(newIndex);
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

  public getCurrentTrack(): ITrack | null {
    if(this._queueIndex) {
      return this._queue()[this._queueIndex()!]; 
    }

    return null;
  }
}
