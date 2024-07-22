import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayingFromService {

  constructor() { }

  playingFrom = signal<string | null>(null);

}
