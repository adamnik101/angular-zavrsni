import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { ConfirmDialogActions } from '../../../../shared/components/confirm-dialog-with-actions/enums/confirm-dialog-actions';
import { MatButtonModule } from '@angular/material/button';
import { EnumActions } from '../../../../shared/enums/enum-actions';
import { ReactiveFormsModule } from '@angular/forms';
import { PlaylistsFormService } from '../../../services/playlists/forms/playlists-form.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CommonInputComponent } from "../../../../shared/form-fields/common-input/common-input.component";
import { SpinnerFunctions } from '../../../static/spinner-functions';

@Component({
  selector: 'app-playlist-form',
  standalone: true,
  imports: [MatDialogActions, MatDialogContent, MatDialogTitle, MatButtonModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, CommonInputComponent, CommonInputComponent],
  templateUrl: './playlist-form.component.html',
  styleUrl: './playlist-form.component.scss'
})
export class PlaylistFormComponent implements OnInit{

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<PlaylistFormComponent>,
    private playlistsForm: PlaylistsFormService
  ) {}

  public confirmDialogActions = ConfirmDialogActions;
  public enumActions = EnumActions;

  public form = this.playlistsForm.getFormReference();
  public isEdit: boolean = false;

  ngOnInit(): void {
    if(this.data && this.data.id) {
      this.isEdit = true;
    }
  }

  confirm(): void {
    SpinnerFunctions.showSpinner();
    if(this.isEdit) {

    } else {
      this.playlistsForm.submitCreate().subscribe({
        next: (data) => {

          this.matDialogRef.close(true);
          SpinnerFunctions.hideSpinner();
        },
        error: (err) => {

          SpinnerFunctions.hideSpinner();
        }
      })
    }

  }

  close(state: boolean = false): void {
    this.matDialogRef.close(state);
  }
}
