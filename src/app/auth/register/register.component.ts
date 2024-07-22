import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonInputComponent } from '../../shared/form-fields/common-input/common-input.component';
import { CommonInputType } from '../../shared/form-fields/common-input/interfaces/i-common-input';
import { SpinnerFunctions } from '../../core/static/spinner-functions';
import { RegisterFormService } from './services/register-form.service';
import { AlertService } from '../../shared/services/alert/alert.service';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonRadioCheckboxComponent } from "../../shared/form-fields/common-radio-checkbox/common-radio-checkbox.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonInputComponent, MatButtonModule, ReactiveFormsModule, MatIcon, RouterLink, CommonRadioCheckboxComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, OnDestroy{
  
  constructor(
    private formService: RegisterFormService,
    private alertService: AlertService
  ) {}

  public form: UntypedFormGroup = this.formService.getFormReference();
  public commonInputType = CommonInputType;
  public errors: any = {};

  ngOnInit(): void {
    SpinnerFunctions.hideSpinner();
    
  }
  
  register(): void {
    this.formService.register().subscribe({
      next: (data) => {
        
        this.alertService.showDefaultMessage("You have successfully registered!");
      },
      error: (err) => {
        const response = err.error;

        if(response.errors.hasOwnProperty('email')) {
          const emailError = response.errors.email[0];
          this.alertService.showErrorMessage(emailError);
        } 
      }
    })
  }

  ngOnDestroy(): void {
    this.formService.reset();
  }
}
