import { Injectable } from '@angular/core';
import { IFormService } from '../../../../../shared/interfaces/i-form-service';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AlbumFormRequestsService } from '../requests/album-form-requests.service';
import { Observable, tap } from 'rxjs';
import { IAlbum } from '../../../../../core/interfaces/album/i-album';

@Injectable({
  providedIn: 'root'
})
export class AlbumFormService implements IFormService{

  constructor(
    private fb: FormBuilder,
    private albumsFormRequestsService: AlbumFormRequestsService
  ) { }

  form: UntypedFormGroup = this.init();
  
  init(): UntypedFormGroup {
    return this.fb.group({
      name: this.fb.control("", [Validators.required]),
      imagePath: this.fb.control(""),
      imageChange: this.fb.control(""),
      releaseYear: this.fb.control(null, [Validators.required]),
      artistId: this.fb.control(null, [Validators.required])
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

  setReleaseYear(year: any): void {
    this.form.get('releaseYear')?.setValue(year);
  }

  setArtistId(id: string): void {
    this.form.get('artistId')?.setValue(id);
  }

  fillForm(id: string | null): Observable<any> {
    return this.albumsFormRequestsService.getDataFromRequestsById(id).pipe(tap({
      next: (data: any) => {
        if(data.album) {
          const album = data.album.data as IAlbum;

          if(album) {
            this.setName(album.name);
            this.setImage(album.cover);
            this.setReleaseYear(album.release_year);
            this.setArtistId(album.artist.id);
          }
        }
      }
    }))
  }

  reset(): void {
    this.form = this.init();
  }
}
