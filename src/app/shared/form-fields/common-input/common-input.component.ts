import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonInputType } from './interfaces/i-common-input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-common-input',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './common-input.component.html',
  styleUrl: './common-input.component.scss'
})
export class CommonInputComponent {

  @Input() public type: CommonInputType = CommonInputType.text;
  @Input() public label: string | null = null;
  @Input() public placeholder: string | null = null;
  @Input() public autocomplete: "on" | "off" = "off";
  @Input() public iconPrefix: string | null = null; 
  @Input() public iconSuffix: string | null = null; 
  @Input() public formControlToFill: any;
  @Input() public showError: boolean = true;

  @Output() KeyEnter: EventEmitter<string> = new EventEmitter();

  onKeyEnter(event: Event): void {
    this.KeyEnter.emit(this.formControlToFill.value);
  }
}
