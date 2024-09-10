import { Component, Inject, OnInit } from '@angular/core';
import { BaseFormDialogComponent } from '../../../../../shared/components/base-form-dialog/base-form-dialog.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { UserFormService } from '../../services/form/user-form.service';
import { IUser } from '../../../../../core/interfaces/user/i-user';
import { ConfirmDialogActions } from '../../../../../shared/components/confirm-dialog-with-actions/enums/confirm-dialog-actions';
import { EnumActions } from '../../../../../shared/enums/enum-actions';
import { MatIcon } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonInputComponent } from '../../../../../shared/form-fields/common-input/common-input.component';
import { CommonSelectComponent } from '../../../../../shared/form-fields/common-select/common-select.component';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { CommonInputType } from '../../../../../shared/form-fields/common-input/interfaces/i-common-input';
import { UserFormRequestsService } from '../../services/requests/user-form-requests.service';
import { AdminUsersTableService } from '../../services/table/admin-users-table.service';
import { AlertService } from '../../../../../shared/services/alert/alert.service';

@Component({
  selector: 'app-add-edit-user',
  standalone: true,
  imports: [MatIcon, MatFormField, MatButton, MatMiniFabButton, MatProgressSpinner,ReactiveFormsModule, CommonInputComponent, CommonSelectComponent, MatDialogTitle, MatDialogContent, MatDialogClose, MatDialogActions],
  templateUrl: './add-edit-user.component.html',
  styleUrl: './add-edit-user.component.scss'
})
export class AddEditUserComponent extends BaseFormDialogComponent implements OnInit {

  constructor(
    protected override matDialog: MatDialog,
    protected override matDialogRef: MatDialogRef<AddEditUserComponent>,
    protected override baseForm: UserFormService,
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    private requestsService: UserFormRequestsService,
    private tableService: AdminUsersTableService,
    private alertService: AlertService
  ) {
    super(matDialog,matDialogRef, baseForm);
  }

  form = this.baseForm.getFormReference();
  confirmDialogActions = ConfirmDialogActions;
  enumActions = EnumActions;
  commonInputType = CommonInputType;
  isEdit: boolean = false;
  selectedImage = null;
  id: string | null = null;
  dropdownData = {
    roles: []
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
        this.dropdownData.roles = data.roles.data.map((x: any) => {return {id: x.id, title: x.name}}) as any;
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

  prepareDataToSend(): any {
    let formValue = this.form.getRawValue();

    let dataToSend = {
      email: formValue.email,
      username: formValue.username,
      role_id: formValue.roleId
    };

    return dataToSend;
  }

  confirm(): void {
    let dataToSend = this.prepareDataToSend();
    if(!this.isEdit) {
      this.requestsService.submitInsert(dataToSend).subscribe({
        next: (data) => {
          this.close(true);
          this.tableService.refreshStorage();
          this.alertService.showDefaultMessage("Successfully added.");
        },
        error: (err) => {
          this.alertService.showErrorMessage("Error on adding.");
        }
      });
    } else {
      this.requestsService.submitUpdate(this.id, dataToSend).subscribe({
        next: (data) => {
          this.close(true);
          this.tableService.refreshStorage();
          this.alertService.showDefaultMessage("Successfully updated.");
        },
        error: (err) => {
          this.alertService.showErrorMessage("Error on updating.");
        }
      });
    }
  }
}
