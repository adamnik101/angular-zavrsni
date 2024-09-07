import { SelectionModel } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { ITrack } from '../../interfaces/tracks/i-track';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackSelectionService {

  constructor() { }

  trackSelection = new SelectionModel<ITrack>(true, []);
  isSelectionDragging: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

}
