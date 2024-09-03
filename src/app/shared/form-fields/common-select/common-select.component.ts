import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldAppearance, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect, MatSelectChange } from '@angular/material/select';
import { ISelectOption } from '../../interfaces/i-select-option';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'app-common-select',
  standalone: true,
  imports: [MatFormField, MatSelect, MatOption, ReactiveFormsModule, MatLabel, MatProgressSpinner],
  templateUrl: './common-select.component.html',
  styleUrl: './common-select.component.scss'
})
export class CommonSelectComponent implements OnInit, OnChanges{

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
  @Input() public mulitple: boolean = false;
  @Input() public disabledOptionIds: string[] = [];

  optionsCame: boolean = false;
  areOptionsEmpty: boolean = false;

  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  
  ngOnInit(): void {
    if(this.formControlToFill) {
      this.formControlToFill.disable();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.formControlToFill && changes['options'] && changes['options'].currentValue.length) {
      this.optionsCame = true;
      this.areOptionsEmpty = false;
      setTimeout(() => {
        if(!this.options.length) {
          this.formControlToFill.disable();
          return;
        }
        this.formControlToFill.enable();
      });
    } else if(this.formControlToFill && changes['options'] && !changes['options'].currentValue.length) {
      this.areOptionsEmpty = true;
    }
  }

  onSelectAll(event: MatOptionSelectionChange): void {
    if(event.source.selected) {
      let filtered = this.options.filter(x => !this.disabledOptionIds.includes(x.id));

      this.formControlToFill.setValue(filtered.map(x => (x.id)));
    } else {
      this.formControlToFill.setValue('');
    }

    this.onSelect.emit(event);
  }

  onSelectionChange(event: MatSelectChange): void {
    // if(event.value === null) {
    //   this.formControlToFill.setValue(null);
    // }
    // console.log(event)
    if(this.mulitple && event.value === 'select-all') {

    }
    this.onSelect.emit(event);
  }
}
