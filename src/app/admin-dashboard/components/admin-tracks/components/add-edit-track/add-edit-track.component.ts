import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogClose, MatDialogActions, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatError, MatFormField } from '@angular/material/form-field';
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
import { CommonRadioCheckboxComponent } from '../../../../../shared/form-fields/common-radio-checkbox/common-radio-checkbox.component';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { IArtist } from '../../../../../core/interfaces/artist/i-artist';
import { IAlbum } from '../../../../../core/interfaces/album/i-album';
import { ISelectOption } from '../../../../../shared/interfaces/i-select-option';
import { AlertService } from '../../../../../shared/services/alert/alert.service';
import { AdminTracksTableService } from '../../services/table/admin-tracks-table.service';

@Component({
  selector: 'app-add-edit-track',
  standalone: true,
  imports: [MatIcon, MatFormField, MatButton, MatMiniFabButton, MatProgressSpinner,ReactiveFormsModule, CommonInputComponent, 
    CommonSelectComponent, MatDialogTitle, MatDialogContent, MatDialogClose, MatDialogActions, CommonRadioCheckboxComponent, MatError],
  templateUrl: './add-edit-track.component.html',
  styleUrl: './add-edit-track.component.scss'
})
export class AddEditTrackComponent extends BaseFormDialogComponent {

  constructor(
    protected override matDialog: MatDialog,
    protected override matDialogRef: MatDialogRef<AddEditTrackComponent>,
    protected override baseForm: TrackFormService,
    @Inject(MAT_DIALOG_DATA) public data: ITrack,
    private alertService: AlertService,
    private adminTracksTableService: AdminTracksTableService
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
    albums: [],
    genres: []
  };

  disabledOwners: string[] = [];
  disabledFeatures: string[] = [];

  private sub: Subscription = new Subscription();

  ngOnInit(): void {
    if(this.data && this.data.id) {
      this.isEdit = true;
      this.id = this.data.id;
      this.trackFormChanged(this.form);
      this.form.get('track')?.setValidators([Validators.required]);
    }

    this.fillForm();
  }

  trackOwner(): void {
    this.sub.add(
      this.form.get("ownerId")?.valueChanges.pipe(distinctUntilChanged()).subscribe({
        next: (id: string) => {

          if(id !== null) {
            const ownerIndex = this.dropdownData.artists.findIndex((x: IArtist) => x.id === id);

            const owner: IArtist = this.dropdownData.artists[ownerIndex];
            if(owner) {
              this.disabledFeatures = [owner.id];
              (this.dropdownData.albums as ISelectOption[]) = owner.albums.map(x => {return {id: x.id, title: x.name}});
              if(!owner.albums.length) {
                  this.form.get('albumId')?.disable();
              } else {
                this.form.get('albumId')?.enable();
              }
            }
          } else {
            this.dropdownData.albums = [];
            this.disabledFeatures = [];
          }
        }
      })
    );
  }

  onOwnerChange(event: any): void {
    this.form.get('albumId')?.setValue(null);
  }

  onFeatureChange(event: any): void {
    this.disabledOwners = this.form.get('features')?.value;
  }

  fillForm(): void {
    this.isLoading = true;
    this.baseForm.fillForm(this.data).subscribe({
      next: (data: any) => {
        console.log(data);
        // this.dropdownData.albums = data.albums.data.map((x: any) => {return {id: x.id, title: x.name}});
        this.dropdownData.artists = data.artists.data.map((x: any) => {return {id: x.id, title: x.name, albums: x.albums}});
        this.dropdownData.genres = data.genres.data.map((x: any) => {return {id: x.id, title: x.name}});

        if(this.data) {
          this.disabledOwners = this.data.features.map(x => x.id);
        }
        this.isLoading = false;

        this.trackOwner();
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

  selectTrack(trackFile: any): void {
    this.form.get("track")?.setValue(trackFile);
  }

  onFileSelected(event: any): void {
    const reader = new FileReader()
    console.log(event.target.files[0]);
    this.baseForm.setPath(event.target.files[0]);

    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (e) => {
      this.baseForm.setPath(e.target?.result as any);
      this.baseForm.setTrack(event.target.files[0]);
      this.selectTrack(event.target.files[0]);
      this.formChanged = true;
    }
  }

  confirm(): void {
    if(this.isEdit) {
      this.baseForm.submitUpdate(this.data.id).subscribe({
        next: (data) => {
          this.close(true);
          this.adminTracksTableService.refreshStorage();
          this.alertService.showDefaultMessage("Successfully updated.");
        },
        error: (err) => {
          this.close();
          this.alertService.showErrorMessage("Error on updating.");
        }
      })
    } else {
      this.baseForm.submitInsert().subscribe({
        next: (data) => {
          this.close(true);
          this.adminTracksTableService.refreshStorage();
          this.alertService.showDefaultMessage("Successfully added.");
        },
        error: (err) => {
          this.close();
          this.alertService.showErrorMessage("Error on adding.");
        }
      })
    }
  }
}
