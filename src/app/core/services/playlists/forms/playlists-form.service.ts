import { Injectable } from '@angular/core';
import { IFormService } from '../../../../shared/interfaces/i-form-service';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../shared/auth/auth.service';
import { UserService } from '../../../user/services/user/user.service';
import { Observable, tap } from 'rxjs';
import { PlaylistsService } from '../base/playlists.service';
import { IPlaylist } from '../../../interfaces/playlist/i-playlist';
import { UserPlaylistsService } from '../../../user/services/playlists/user-playlists.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsFormService implements IFormService{
  constructor(
   private formBuilder: FormBuilder,
   private playlistsService: PlaylistsService,
   private userPlaylistsService: UserPlaylistsService
  ) {}

  dataToSend: any;
  form: UntypedFormGroup = this.init();

  init(): UntypedFormGroup {
    return this.formBuilder.group<any>({
      id: this.formBuilder.control(''),
      imagePath: this.formBuilder.control(null),
      title: this.formBuilder.control('', [Validators.required]),
      description: this.formBuilder.control('')
    })
  }

  getFormReference(): UntypedFormGroup {
    return this.form;
  }

  fillForm(playlist: IPlaylist): void {
    this.setId(playlist.id);
    this.setImagePath(playlist.image_url);
    this.setTitle(playlist.title);
    this.setDescription(playlist.description);
  }

  setId(id: string): void {
    this.form.get('id')?.setValue(id);
  }

  setImagePath(path: string | null): void {
    this.form.get('imagePath')?.setValue(path);
  }

  setTitle(title: string): void {
    this.form.get('title')?.setValue(title);
  }

  setDescription(desc: string): void {
    this.form.get('description')?.setValue(desc);
  }

  prepareDataToSend(): any {
    let dataToSend: any = {
      id: this.form.get('id')?.value,
      title: this.form.get('title')?.value,
      description: this.form.get('description')?.value
    };

    this.dataToSend = dataToSend;
    return dataToSend;
  }

  submitCreate(): Observable<any> {
    let data = this.prepareDataToSend();
    
    return this.playlistsService.post(data).pipe(tap({
      next: (data) => {
        this.userPlaylistsService.getPlaylists();
      }
    }));
  }

  submitUpdate(): Observable<any> {
    let dataToSend = this.prepareDataToSend();

    return this.playlistsService.patch<IPlaylist>(dataToSend.id, dataToSend).pipe(tap({
      next: (data) => {
        const playlistId = data.data.id;

        this.userPlaylistsService.playlists.update(playlists => {

          let index = playlists.findIndex(playlist => playlist.id === playlistId);

          if(index !== -1) {
            playlists[index] = data.data;
          }

          return playlists;
        })
      }
    }));
  }

  reset(): void {
    this.form = this.init();
  }

  
}
