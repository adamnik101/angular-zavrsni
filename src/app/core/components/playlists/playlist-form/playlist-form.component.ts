import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { ConfirmDialogActions } from '../../../../shared/components/confirm-dialog-with-actions/enums/confirm-dialog-actions';
import { MatButtonModule, MatMiniFabButton } from '@angular/material/button';
import { EnumActions } from '../../../../shared/enums/enum-actions';
import { FormControlName, ReactiveFormsModule } from '@angular/forms';
import { PlaylistsFormService } from '../../../services/playlists/forms/playlists-form.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CommonInputComponent } from "../../../../shared/form-fields/common-input/common-input.component";
import { CommonTextareaComponent } from '../../../../shared/form-fields/common-textarea/common-textarea.component';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { AlertService } from '../../../../shared/services/alert/alert.service';
import { BaseFormDialogComponent } from '../../../../shared/components/base-form-dialog/base-form-dialog.component';

@Component({
  selector: 'app-playlist-form',
  standalone: true,
  imports: [MatDialogActions, MatDialogContent, MatDialogTitle, MatButtonModule,
    ReactiveFormsModule, MatFormField, MatLabel, MatInput, CommonInputComponent,
    CommonInputComponent, CommonTextareaComponent, MatMiniFabButton, MatIcon, MatDialogClose, MatTooltip],
  templateUrl: './playlist-form.component.html',
  styleUrl: './playlist-form.component.scss'
})
export class PlaylistFormComponent extends BaseFormDialogComponent implements OnInit, OnDestroy{

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected override matDialogRef: MatDialogRef<PlaylistFormComponent>,
    protected override matDialog: MatDialog,
    protected override baseForm: PlaylistsFormService,
    private alertService: AlertService
  ) {
    super(matDialog, matDialogRef, baseForm);
  }

  @ViewChild('imageUpload') private imageUpload!: ElementRef;

  public confirmDialogActions = ConfirmDialogActions;
  public enumActions = EnumActions;

  public form = this.baseForm.getFormReference();
  public selectedImage: any = null;
  public isEdit: boolean = false;

  ngOnInit(): void {
    if(this.data && this.data.id) {
      this.isEdit = true;

      this.fillForm();
      this.trackFormChanged(this.form);
    }
  }

  fillForm(): void {
    this.baseForm.fillForm(this.data);
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
    console.log(this.isEdit)
    if(this.isEdit) {
      this.baseForm.submitUpdate().subscribe({
        next: (data) => {

          this.alertService.showDefaultMessage("Playlist has been updated.");
          this.matDialogRef.close(true);
        },
        error: (err) => {

          this.alertService.showErrorMessage("Error with updating a playlist. Try again later.");
        }
      })
    } else {
      this.baseForm.submitCreate().subscribe({
        next: (data) => {
          this.matDialogRef.close(true);

          this.alertService.showDefaultMessage("Playlist has been created.");
        },
        error: (err) => {

          this.alertService.showErrorMessage("Error with creating a playlist. Try again later.");
        }
      })
    }

  }

}
