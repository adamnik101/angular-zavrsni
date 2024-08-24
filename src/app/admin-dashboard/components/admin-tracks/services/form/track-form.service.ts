import { Injectable } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TrackRequestsService } from '../requests/track-requests.service';
import { IFormService } from '../../../../../shared/interfaces/i-form-service';
import { Observable, tap } from 'rxjs';
import { ITrack } from '../../../../../core/interfaces/tracks/i-track';

@Injectable({
  providedIn: 'root'
})
export class TrackFormService implements IFormService{

  constructor(
    private fb: FormBuilder,
    private trackRequestsService: TrackRequestsService
  ) { }

  form: UntypedFormGroup = this.init();
  
  init(): UntypedFormGroup {
    return this.fb.group({
      title: this.fb.control("", [Validators.required]),
      ownerId: this.fb.control("", [Validators.required]),
      albumId: this.fb.control("")
    });
  }
  
  getFormReference(): UntypedFormGroup {
    return this.form;
  }

  setTitle(title: string): void {
    this.form.get('title')?.setValue(title);
  }

  setOwnerId(id: string): void {
    this.form.get('ownerId')?.setValue(id);
  }

  setAlbumId(id: string): void {
    this.form.get('albumId')?.setValue(id);
  }

  fillForm(track: ITrack): Observable<any> {
    return this.trackRequestsService.getDataFromRequestsById(null).pipe(tap({
      next: (data: any) => {
        if(track) {
            this.setTitle(track.title);
            this.setOwnerId(track.owner.id);
            this.setAlbumId(track.album ? track.album.id : "");
          }
        }
    }))
  }

  reset(): void {
    this.form = this.init();
  }
}
