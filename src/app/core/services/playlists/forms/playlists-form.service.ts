import { Injectable } from '@angular/core';
import { IFormService } from '../../../../shared/interfaces/i-form-service';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { AuthService } from '../../../../shared/auth/auth.service';
import { UserService } from '../../../user/services/user/user.service';
import { Observable } from 'rxjs';
import { PlaylistsService } from '../base/playlists.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsFormService implements IFormService{
  constructor(
   private formBuilder: FormBuilder,
   private playlistsService: PlaylistsService
  ) {}

  form: UntypedFormGroup = this.init();

  init(): UntypedFormGroup {
    return this.formBuilder.group<any>({
      title: this.formBuilder.control(''),
    })
  }

  getFormReference(): UntypedFormGroup {
    return this.form;
  }

  prepareDataToSend(): any {
    let dataToSend: any = {
      title: this.form.get('title')?.value,
    }

    return dataToSend;
  }

  submitCreate(): Observable<any> {
    let data = this.prepareDataToSend();
    
    return this.playlistsService.post(data);
  }

  reset(): void {
    this.form = this.init();
  }

  
}
