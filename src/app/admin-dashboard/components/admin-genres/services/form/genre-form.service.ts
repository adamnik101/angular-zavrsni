import { Injectable } from '@angular/core';
import { IFormService } from '../../../../../shared/interfaces/i-form-service';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { GenreRequestsService } from '../requests/genre-requests.service';
import { Observable, tap } from 'rxjs';
import { IGenre } from '../../../../../core/interfaces/genre/i-genre';

@Injectable({
  providedIn: 'root'
})
export class GenreFormService implements IFormService{

  constructor(
    private fb: FormBuilder,
    private genreRequestsService: GenreRequestsService
  ) { }

  form: UntypedFormGroup = this.init();
  
  init(): UntypedFormGroup {
    return this.fb.group({
      name: this.fb.control("", [Validators.required]),
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

  fillForm(id: string | null): Observable<any> {
    return this.genreRequestsService.getDataFromRequestsById(id).pipe(tap({
      next: (data: any) => {
        if(data.genre) {
          const genre = data.genre.data as IGenre;

          if(genre) {
            this.setName(genre.name);
            this.setImage(genre.cover);
          }
        }
      }
    }))
  }

  prepareDataToSend(): any {
    let formData = new FormData();

    if(this.form.get("image")?.value) {
      formData.append('cover', this.form.get("image")?.value);
    }

    formData.append('name', this.form.get("name")?.value);
    
    return formData;
  }

  submitUpdate(id: string | null): Observable<any> {
    const dataToSend = this.prepareDataToSend();

    return this.genreRequestsService.submitUpdate(id ?? "", dataToSend);
  }

  submitInsert(): Observable<any> {
    const dataToSend = this.prepareDataToSend();
    
    return this.genreRequestsService.submitInsert(dataToSend);
  }

  reset(): void {
    this.form = this.init();
  }
}
