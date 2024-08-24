import { Component, Inject, OnInit } from '@angular/core';
import { BaseFormDialogComponent } from '../../../../../shared/components/base-form-dialog/base-form-dialog.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { AlbumFormService } from '../../services/form/album-form.service';
import { ConfirmDialogActions } from '../../../../../shared/components/confirm-dialog-with-actions/enums/confirm-dialog-actions';
import { MatIcon } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { EnumActions } from '../../../../../shared/enums/enum-actions';
import { CommonInputComponent } from '../../../../../shared/form-fields/common-input/common-input.component';
import { MatButton, MatButtonModule, MatMiniFabButton } from '@angular/material/button';
import { IAlbum } from '../../../../../core/interfaces/album/i-album';
import { CommonSelectComponent } from "../../../../../shared/form-fields/common-select/common-select.component";
import { IArtist } from '../../../../../core/interfaces/artist/i-artist';
import { IApiResponse } from '../../../../../shared/interfaces/i-api-response';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-add-edit-albums',
  standalone: true,
  imports: [MatIcon, MatProgressSpinner, ReactiveFormsModule, CommonInputComponent, MatDialogContent, MatDialogTitle, MatDialogActions, MatButtonModule, MatMiniFabButton, MatDialogClose, CommonSelectComponent],
  templateUrl: './add-edit-albums.component.html',
  styleUrl: './add-edit-albums.component.scss'
})
export class AddEditAlbumsComponent extends BaseFormDialogComponent implements OnInit {

  constructor(
    protected override matDialog: MatDialog,
    protected override matDialogRef: MatDialogRef<AddEditAlbumsComponent>,
    protected override baseForm: AlbumFormService,
    @Inject(MAT_DIALOG_DATA) public data: IAlbum
  ) {
    super(matDialog,matDialogRef, baseForm);
  }

  form = this.baseForm.getFormReference();
  confirmDialogActions = ConfirmDialogActions;
  enumActions = EnumActions;
  isEdit: boolean = false;
  selectedImage = null;
  id: string | null = null;
  dropdownData = {
    artists: []
  };

  ngOnInit(): void {
    if(this.data && this.data.id) {
      this.isEdit = true;
      this.id = this.data.id;
      this.trackFormChanged(this.form);
    }

    this.fillForm();
  }

  fillForm(): void {
    this.isLoading = true;
    this.baseForm.fillForm(this.id).subscribe({
      next: (data: {artists: IApiResponse<IArtist[]>}) => {
        this.dropdownData.artists = data.artists.data.map(x => {return {id: x.id, title: x.name}}) as any;
        
        this.isLoading = false;
      }
    })
  }

  onImageChange(event: any): void {
    this.selectedImage = event.target.files[0] ?? null
    
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedImage);

      reader.onload = (e) => {
        this.form.get('imageChange')?.setValue('');
        this.form.get('image')?.setValue(this.selectedImage);
        this.form.get('imagePath')?.setValue(e.target?.result);
      };
    }
  }

  confirm(): void {

  }
}
