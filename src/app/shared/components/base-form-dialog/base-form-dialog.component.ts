import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription, tap } from 'rxjs';
import { ConfirmDialogWithActionsComponent } from '../confirm-dialog-with-actions/confirm-dialog-with-actions.component';
import { ConfirmDialogActions } from '../confirm-dialog-with-actions/enums/confirm-dialog-actions';
import { IFormService } from '../../interfaces/i-form-service';

@Component({
  selector: 'app-base-form-dialog',
  standalone: true,
  imports: [],
  templateUrl: './base-form-dialog.component.html',
  styleUrl: './base-form-dialog.component.scss'
})
export abstract class BaseFormDialogComponent implements OnDestroy {

  constructor(
    protected matDialog: MatDialog,
    protected matDialogRef: MatDialogRef<any>,
    @Inject('baseForm') protected baseForm: IFormService
  ) {
    this.trackBackdropClick(matDialogRef);
  }

  protected formChanged: boolean = false;

  private isTrackingChanges: boolean = false;
  private subscription: Subscription = new Subscription();

  trackBackdropClick(matDialogRef: MatDialogRef<any>): void {
    matDialogRef.disableClose = true;
    matDialogRef.backdropClick().subscribe({
      next: (event) => {
        if(this.isTrackingChanges && this.formChanged) {
          this.openConfirmCloseDialog();
          return;
        }

        matDialogRef.close(false);
      }
    })
  }

  trackFormChanged(form: UntypedFormGroup): void {
    this.isTrackingChanges = true;
    this.subscription.add(
      form.valueChanges.subscribe({
        next: (data) => {
          if(form.dirty) {
            this.formChanged = true;
          }
        }
      })
    );
  }

  close(state: boolean = false): void {
    if(this.isTrackingChanges && this.formChanged && !state) {
      this.openConfirmCloseDialog();
    } else {
      this.matDialogRef.close(state);
    }
  }


  private openConfirmCloseDialog(): void {
    this.matDialog.open(ConfirmDialogWithActionsComponent, {
      width: '500px',
      height: 'auto',
      data: {
        header: 'Confirm',
        message: 'Are you sure you want to close dialog? \n You did not save changes.',
        actions: [ConfirmDialogActions.confirm]
      }
    }).afterClosed().subscribe({
      next: (data) => {
        if(data.state && data.action === ConfirmDialogActions.confirm) {
          this.matDialogRef.close(false);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.baseForm.reset();
  }
}
