import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-no-results',
  standalone: true,
  imports: [MatIcon, NgClass],
  templateUrl: './no-results.component.html',
  styleUrl: './no-results.component.scss'
})
export class NoResultsComponent {

  @Input() public icon: string = 'sentiment_dissatisfied';
  @Input() public message: string = 'No results';
  @Input() public small: boolean = false;
}
