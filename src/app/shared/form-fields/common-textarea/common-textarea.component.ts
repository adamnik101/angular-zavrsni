import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-common-textarea',
  standalone: true,
  imports: [MatFormField, MatLabel, ReactiveFormsModule, MatError, MatInput],
  templateUrl: './common-textarea.component.html',
  styleUrl: './common-textarea.component.scss'
})
export class CommonTextareaComponent {

  @Input() public formControlToFill: any;
  @Input() public label: string = '';
  @Input() public rows: number = 5;
  @Input() public cols: number = 100;

}
