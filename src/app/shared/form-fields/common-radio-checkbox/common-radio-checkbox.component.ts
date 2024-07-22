import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-common-radio-checkbox',
  standalone: true,
  imports: [MatCheckbox, ReactiveFormsModule, NgClass],
  templateUrl: './common-radio-checkbox.component.html',
  styleUrl: './common-radio-checkbox.component.scss'
})
export class CommonRadioCheckboxComponent {

  @Input() formControlToFill: any;
  @Input() label: string | null = null;

  requiredValidator = Validators.requiredTrue;
}
