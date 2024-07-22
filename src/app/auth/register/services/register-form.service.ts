import { Injectable } from '@angular/core';
import { IFormService } from '../../../shared/interfaces/i-form-service';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/auth/auth.service';
import { IRegisterForm, IRegisterRequest } from '../interfaces/i-register';
import { Observable, tap } from 'rxjs';
import { confirmPasswordValidator } from '../../../shared/validators/confirm-password.validator';

@Injectable({
  providedIn: 'root'
})
export class RegisterFormService implements IFormService{

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }
  
  form: UntypedFormGroup = this.init();

  init(): UntypedFormGroup {
    return this.formBuilder.group<IRegisterForm>({
      username: this.formBuilder.control('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required]),
      confirmPassword: this.formBuilder.control('', [Validators.required]),
      terms: this.formBuilder.control(false, [Validators.requiredTrue])
    }, {validators: confirmPasswordValidator()});
  }
  
  getFormReference(): UntypedFormGroup {
    return this.form;
  }
  
  prepareDataToSend(): IRegisterRequest {
    let dataToSend: IRegisterRequest = {
      username: this.form.get('username')?.value,
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value
    }

    return dataToSend;
  }
  
  register(): Observable<any> {
    let data = this.prepareDataToSend();
    return this.authService.register(data).pipe(tap({
      next: (data: any) => {
        if(data) {
          console.log(data)
          // this.userService.setUserData(data.data.user);
          // this.authService.setToken(data.data.token)
        }
      }
    }));
  }
  
  reset(): void {
    this.form.reset();
  }
}
