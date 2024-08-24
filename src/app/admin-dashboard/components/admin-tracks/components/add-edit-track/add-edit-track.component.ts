import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogClose, MatDialogActions, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CommonInputComponent } from '../../../../../shared/form-fields/common-input/common-input.component';
import { CommonSelectComponent } from '../../../../../shared/form-fields/common-select/common-select.component';
import { BaseFormDialogComponent } from '../../../../../shared/components/base-form-dialog/base-form-dialog.component';
import { TrackFormService } from '../../services/form/track-form.service';
import { ITrack } from '../../../../../core/interfaces/tracks/i-track';
import { ConfirmDialogActions } from '../../../../../shared/components/confirm-dialog-with-actions/enums/confirm-dialog-actions';
import { EnumActions } from '../../../../../shared/enums/enum-actions';
import { CommonInputType } from '../../../../../shared/form-fields/common-input/interfaces/i-common-input';

@Component({
  selector: 'app-add-edit-track',
  standalone: true,
  imports: [MatIcon, MatFormField, MatButton, MatMiniFabButton, MatProgressSpinner,ReactiveFormsModule, CommonInputComponent, CommonSelectComponent, MatDialogTitle, MatDialogContent, MatDialogClose, MatDialogActions],
  templateUrl: './add-edit-track.component.html',
  styleUrl: './add-edit-track.component.scss'
})
export class AddEditTrackComponent extends BaseFormDialogComponent {

  constructor(
    protected override matDialog: MatDialog,
    protected override matDialogRef: MatDialogRef<AddEditTrackComponent>,
    protected override baseForm: TrackFormService,
    @Inject(MAT_DIALOG_DATA) public data: ITrack
  ) {
    super(matDialog, matDialogRef, baseForm);
  }

  form = this.baseForm.getFormReference();
  confirmDialogActions = ConfirmDialogActions;
  enumActions = EnumActions;
  commonInputType = CommonInputType;
  isEdit: boolean = false;
  selectedImage = null;
  id: string | null = null;
  dropdownData = {
    artists: [],
    albums: []
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
    this.baseForm.fillForm(this.data).subscribe({
      next: (data: any) => {

        console.log(data);
        this.dropdownData.albums = data.albums.data.data.map((x: any) => {return {id: x.id, title: x.name}});
        this.dropdownData.artists = data.artists.data.map((x: any) => {return {id: x.id, title: x.name}});

        console.log(this.dropdownData)
        // this.dropdownData.roles = data.roles.data.map((x: any) => {return {id: x.id, title: x.name}}) as any;
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
