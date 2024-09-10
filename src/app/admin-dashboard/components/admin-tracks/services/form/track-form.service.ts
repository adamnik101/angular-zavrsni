import { Injectable } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TrackRequestsService } from '../requests/track-requests.service';
import { IFormService } from '../../../../../shared/interfaces/i-form-service';
import { Observable, of, tap } from 'rxjs';
import { ITrack } from '../../../../../core/interfaces/tracks/i-track';
import { IArtist } from '../../../../../core/interfaces/artist/i-artist';

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
      features: this.fb.control(""),
      albumId: this.fb.control(""),
      path: this.fb.control(""),
      duration: this.fb.control(""),
      explicit: this.fb.control(""),
      genreId: this.fb.control(""),
      image: this.fb.control(null),
      imagePath: this.fb.control(""),
      imageChange: this.fb.control(""),
      track: this.fb.control(null)
    });
  }
  
  getFormReference(): UntypedFormGroup {
    return this.form;
  }

  setTitle(title: string): void {
    this.form.get('title')?.setValue(title);
  }

  setImage(image: string): void {
    this.form.get('imagePath')?.setValue(image);
  }

  setOwnerId(id: string): void {
    this.form.get('ownerId')?.setValue(id);
  }

  setAlbumId(id: string): void {
    this.form.get('albumId')?.setValue(id);
  }

  setPath(path: string): void {
    this.form.get("path")?.setValue(path);
  }

  setDuration(duration: any): void {
    this.form.get("duration")?.setValue(duration);
  }

  setExplicit(explicit: any): void {
    this.form.get("explicit")?.setValue(explicit);
  }

  setGenreId(genreId: string): void {
    this.form.get("genreId")?.setValue(genreId);
  }

  setFeatures(features: IArtist[]): void {
    this.form.get('features')?.setValue(features.map(x => x.id));
  }

  setTrack(trackFile: any): void {
    this.form.get('track')?.setValue(trackFile);
  }

  fillForm(track: ITrack): Observable<any> {
    return this.trackRequestsService.getDataFromRequestsById(null).pipe(tap({
      next: (data: any) => {
        if(track) {
            this.setTitle(track.title);
            this.setImage(track.cover);
            this.setOwnerId(track.owner.id);
            this.setAlbumId(track.album ? track.album.id : "");
            this.setPath(track.path);
            this.setDuration(track.duration);
            this.setExplicit(track.explicit);
            this.setGenreId(track.genre_id);
            this.setFeatures(track.features);
          }
        }
    }))
  }

  reset(): void {
    this.form = this.init();
  }

  prepareDataToSend(): any {
    let formData = new FormData();

    let formValue = this.form.getRawValue();


    formData.append('title', formValue.title);

    if(formValue.image) {
      formData.append('cover', formValue.image);
    }

    formData.append('owner', formValue.ownerId);

    if(formValue.albumId) {
      formData.append('album', formValue.albumId);
    }

    if(formValue.genreId) {
      formData.append('genre', formValue.genreId);
    }

    formData.append('explicit', formValue.explicit);

    if(formValue.features) {
      for(let id of formValue.features) {
        formData.append('features[]', id)
      }
    }

    if(formValue.track) {
      formData.append('track', formValue.track);
    }

    return formData;
  }

  submitInsert(): Observable<any> {
    let dataToSend = this.prepareDataToSend();

    return this.trackRequestsService.submitInsert(dataToSend);
  }

  submitUpdate(id: string): Observable<any> {
    let dataToSend = this.prepareDataToSend();

    return this.trackRequestsService.submitUpdate(id, dataToSend);
  }
}
