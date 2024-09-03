import { Injectable } from '@angular/core';
import { IFormService } from '../../../../../shared/interfaces/i-form-service';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { ArtistsRequestsService } from '../requests/artists-requests.service';
import { IArtist } from '../../../../../core/interfaces/artist/i-artist';

@Injectable({
  providedIn: 'root'
})
export class ArtistFormService implements IFormService{

  constructor(
    private fb: FormBuilder,
    private artistsRequestsService: ArtistsRequestsService
  ) { }

  form: UntypedFormGroup = this.init();
  
  init(): UntypedFormGroup {
    return this.fb.group({
      name: this.fb.control("", [Validators.required]),
      verified: this.fb.control(false),
      image: this.fb.control(null),
      imagePath: this.fb.control(""),
      imageChange: this.fb.control(""),
      });
  }
  
  getFormReference(): UntypedFormGroup {
    return this.form;
  }
  
  setName(name: string): void {
    this.form.get('name')?.setValue(name);
  }

  setImage(image: string): void {
    this.form.get('imagePath')?.setValue(image);
  }

  setVerified(verified: boolean): void {
    this.form.get('verified')?.setValue(verified);
  }

  fillForm(id: string | null): Observable<any> {
    return this.artistsRequestsService.getDataFromRequestsById(id).pipe(tap({
      next: (data: any) => {
        if(data.artist) {
          const artist = data.artist.data as IArtist;

          if(artist) {
            this.setName(artist.name);
            this.setImage(artist.cover);
            this.setVerified(artist.verified);
          }
        }
      }
    }))
  }

  submitUpdate(id: string | null): Observable<any> {
    let dataToSend = this.prepareDataToSend();

    return this.artistsRequestsService.submitUpdate(id ?? '', dataToSend);
  }

  submitInsert(): Observable<any>{
    let dataToSend = this.prepareDataToSend();

    return this.artistsRequestsService.submitInsert(dataToSend);
  }

  prepareDataToSend(): any {
    const formData = new FormData();

    if(this.form.get("image")?.value) {
      formData.append('cover', this.form.get("image")?.value);
    }

    formData.append('name', this.form.get("name")?.value);

    formData.append('verified', this.form.get('verified')?.value);
    
    return formData;
  }

  reset(): void {
    this.form = this.init();
  }
}