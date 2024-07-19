import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TracksTableRowService {
  public currTrack = signal<string | null>(null);
  constructor() { }
  
}
