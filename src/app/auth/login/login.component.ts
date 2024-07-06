import { Component, OnInit } from '@angular/core';
import { CommonInputComponent } from '../../shared/form-fields/common-input/common-input.component';
import { CommonInputType } from '../../shared/form-fields/common-input/interfaces/i-common-input';
import { AuthService } from '../../shared/auth/auth.service';
import { LoginFormService } from './services/login-form.service';
import { SpinnerFunctions } from '../../core/static/spinner-functions';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonInputComponent, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  constructor(
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
      },
      error: (err) => {
        console.log(err)

        SpinnerFunctions.hideSpinner();
      }
    })    
  }
}
