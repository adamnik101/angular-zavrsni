import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonInputComponent } from '../../shared/form-fields/common-input/common-input.component';
import { CommonInputType } from '../../shared/form-fields/common-input/interfaces/i-common-input';
import { LoginFormService } from './services/login-form.service';
import { SpinnerFunctions } from '../../core/static/spinner-functions';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AlertService } from '../../shared/services/alert/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonInputComponent, MatButtonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy{

  constructor(
    private alertService: AlertService,
    private loginFormService: LoginFormService,
    private router: Router
  ) {}

  public commonInputType = CommonInputType;

  public form = this.loginFormService.getFormReference();

  ngOnInit(): void {
    SpinnerFunctions.hideSpinner();
  }

  login(): void {
    SpinnerFunctions.showSpinner();
    this.loginFormService.login().subscribe({
      next: (data) => {
        this.router.navigateByUrl("/home");
        SpinnerFunctions.hideSpinner();
        this.alertService.showDefaultMessage(data.message);
      },
      error: (err) => {        
        SpinnerFunctions.hideSpinner();
        this.alertService.showErrorMessage(err.error.message);
      }
    });    
  }

  ngOnDestroy(): void {
    this.loginFormService.reset();
  }
}
