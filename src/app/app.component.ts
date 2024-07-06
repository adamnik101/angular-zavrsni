import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PageSpinnerComponent } from './shared/components/page-spinner/page-spinner.component';
import { SpinnerFunctions } from './core/static/spinner-functions';
import { AuthService } from './shared/auth/auth.service';
import { UserService } from './core/user/services/user/user.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent, PageSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'ng-zavrsni';

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.checkPreviousUserData();
  }

  checkPreviousUserData(): void {
    const hasToken = this.authService.hasToken();
    if(hasToken) {
      SpinnerFunctions.initialRequest = true;
      SpinnerFunctions.showSpinner();
      this.authService.getUserData().pipe(tap({
        next: (data) => {
          if(data) {
            this.userService.loggedIn.set(true);
          }
        }
      })).subscribe({
        next: (data) => {
          console.log(data)
          this.userService.setUserData(data.data)
          SpinnerFunctions.initialRequest = false;
          SpinnerFunctions.hideSpinner();
        }
      });
    } else {
      SpinnerFunctions.initialRequest = false;
    }
  }
}
