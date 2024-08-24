import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldAppearance, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { ISelectOption } from '../../interfaces/i-select-option';

@Component({
  selector: 'app-common-select',
  standalone: true,
  imports: [MatFormField, MatSelect, MatOption, ReactiveFormsModule, MatLabel],
  templateUrl: './common-select.component.html',
  styleUrl: './common-select.component.scss'
})
export class CommonSelectComponent {

  @Input() public appearance: MatFormFieldAppearance = 'outline';
  @Input() public label: string | null = null;
  @Input() public placeholder: string | null = null;
  @Input() public autocomplete: "on" | "off" = "off";
  @Input() public iconPrefix: string | null = null; 
  @Input() public iconSuffix: string | null = null; 
  @Input() public formControlToFill: any;
  @Input() public showError: boolean = true;
  @Input() public onBlurElement: boolean = false;
  @Input() public showDefaultValue: boolean = true;
  @Input() public options: ISelectOption[] = [];
}
