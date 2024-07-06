import { Injectable } from '@angular/core';
import { IFormService } from '../../../shared/interfaces/i-form-service';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ILoginForm } from '../interfaces/i-login';
import { ICredentials } from '../../../shared/interfaces/i-credentials';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../../../shared/auth/auth.service';
import { UserPlaylistsService } from '../../../core/user/services/playlists/user-playlists.service';
import { UserService } from '../../../core/user/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginFormService implements IFormService{
  constructor(
   private formBuilder: FormBuilder,
   private authService: AuthService,
   private userService: UserService
  ) {}

  form: UntypedFormGroup = this.init();

  init(): UntypedFormGroup {
    return this.formBuilder.group<ILoginForm>({
      email: this.formBuilder.control(''),
      password: this.formBuilder.control('')
    })
  }

  getFormReference(): UntypedFormGroup {
    return this.form;
  }

  prepareDataToSend(): ICredentials {
    let dataToSend: ICredentials = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value
    }

    return dataToSend;
  }

  login(): Observable<any> {
    let data = this.prepareDataToSend();
    return this.authService.login(data).pipe(tap({
      next: (data) => {
        if(data) {
          this.userService.setUserData(data.data.user);
          this.authService.setToken(data.data.token)
        }
      }
    }));
  }

  reset(): void {
    this.form = this.init();
  }

  
}
