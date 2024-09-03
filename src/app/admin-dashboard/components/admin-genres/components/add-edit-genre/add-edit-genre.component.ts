import { Component, Inject, OnInit } from '@angular/core';
import { BaseFormDialogComponent } from '../../../../../shared/components/base-form-dialog/base-form-dialog.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { GenreFormService } from '../../services/form/genre-form.service';
import { IGenre } from '../../../../../core/interfaces/genre/i-genre';
import { ConfirmDialogActions } from '../../../../../shared/components/confirm-dialog-with-actions/enums/confirm-dialog-actions';
import { EnumActions } from '../../../../../shared/enums/enum-actions';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CommonInputComponent } from '../../../../../shared/form-fields/common-input/common-input.component';
import { CommonRadioCheckboxComponent } from '../../../../../shared/form-fields/common-radio-checkbox/common-radio-checkbox.component';
import { CommonSelectComponent } from '../../../../../shared/form-fields/common-select/common-select.component';
import { AlertService } from '../../../../../shared/services/alert/alert.service';

@Component({
  selector: 'app-add-edit-genre',
  standalone: true,
  imports: [MatIcon, MatProgressSpinner, ReactiveFormsModule, CommonInputComponent, MatDialogContent, MatDialogTitle, MatDialogActions, MatButtonModule, MatMiniFabButton, MatDialogClose, CommonSelectComponent, CommonRadioCheckboxComponent],
  templateUrl: './add-edit-genre.component.html',
  styleUrl: './add-edit-genre.component.scss'
})
export class AddEditGenreComponent extends BaseFormDialogComponent implements OnInit {

  constructor(
    protected override matDialog: MatDialog,
    protected override matDialogRef: MatDialogRef<AddEditGenreComponent>,
    protected override baseForm: GenreFormService,
    @Inject(MAT_DIALOG_DATA) public data: IGenre,
    private alertService: AlertService
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
      next: (data: any) => {
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
    if(this.isEdit) {
      this.baseForm.submitUpdate(this.id).subscribe({
        next: (response) => {
          this.alertService.showDefaultMessage('Successfully updated a genre.');
          this.matDialogRef.close(true);
        } 
      });
    } else {
      this.baseForm.submitInsert().subscribe({
        next: (response) => {
          this.alertService.showDefaultMessage('Successfully inserted a new genre.');
          this.matDialogRef.close(true);
        }
      });
    }
  }
}