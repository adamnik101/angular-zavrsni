import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ApiService } from '../../../shared/base-logic/api/api.service';

@Component({
  selector: 'app-play-all-button',
  standalone: true,
  imports: [MatIcon, MatIconButton],
  templateUrl: './play-all-button.component.html',
  styleUrl: './play-all-button.component.scss'
})
export class PlayAllButtonComponent {

  @Input({required: true}) public apiService!: ApiService<any>;
  @Input({required: true}) public id: string = "";

  @Output() public onPlay: EventEmitter<boolean> = new EventEmitter();

  play(event: any): void {
    this.onPlay.emit(true);

    this.apiService.get<any>(this.id).subscribe({
      next: (response) => {
        if(response.data.hasOwnProperty('tracks')) {
          console.log(response.data.tracks)
        }
      }
    })
  }
}
