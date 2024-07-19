import { Component, Inject } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { ConfirmDialogActions } from './enums/confirm-dialog-actions';
import { IConfirmDialog } from '../../interfaces/i-confirm-dialog';

@Component({
  selector: 'app-confirm-dialog-with-actions',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule],
  templateUrl: './confirm-dialog-with-actions.component.html',
  styleUrl: './confirm-dialog-with-actions.component.scss'
})
export class ConfirmDialogWithActionsComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IConfirmDialog,
    private matDialogRef: MatDialogRef<ConfirmDialogWithActionsComponent>
  ) {}

  public readonly confirmDialogActions = ConfirmDialogActions;

  protected close(state: boolean = false): void {
    this.matDialogRef.close(state);
  }
}
