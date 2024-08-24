import { Injectable } from '@angular/core';
import { IFormService } from '../../../../../shared/interfaces/i-form-service';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UserFormRequestsService } from '../requests/user-form-requests.service';
import { Observable, tap } from 'rxjs';
import { IUser } from '../../../../../core/interfaces/user/i-user';

@Injectable({
  providedIn: 'root'
})
export class UserFormService implements IFormService{

  constructor(
    private fb: FormBuilder,
    private userFormRequestsService: UserFormRequestsService
  ) { }

  form: UntypedFormGroup = this.init();
  
  init(): UntypedFormGroup {
    return this.fb.group({
      username: this.fb.control("", [Validators.required]),
      email: this.fb.control("", [Validators.required, Validators.email]),
      roleId: this.fb.control("", [Validators.required])
    });
  }
  
  getFormReference(): UntypedFormGroup {
    return this.form;
  }
  
  setUsername(username: string): void {
    this.form.get('username')?.setValue(username);
  }

  setEmail(email: string): void {
    this.form.get('email')?.setValue(email);
  }

  setRoleId(roleId: string): void {
    this.form.get('roleId')?.setValue(roleId);
  }

  fillForm(id: string | null): Observable<any> {
    return this.userFormRequestsService.getDataFromRequestsById(id).pipe(tap({
      next: (data: any) => {
        if(data.user) {
          const user = data.user.data as IUser;

          if(user) {
            this.setUsername(user.username);
            this.setEmail(user.email);
            this.setRoleId(user.role_id);
          }
        }
      }
    }))
  }

  reset(): void {
    this.form = this.init();
  }
}
