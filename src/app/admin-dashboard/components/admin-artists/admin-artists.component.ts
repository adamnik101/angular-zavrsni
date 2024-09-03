import { Component, OnInit } from '@angular/core';
import { BackendTableComponent } from "../../../shared/components/backend-table/backend-table.component";
import { AdminArtistsService } from './services/api/admin-artists.service';
import { AdminArtistsTableService } from './services/table/admin-artists-table.service';
import { IArtist } from '../../../core/interfaces/artist/i-artist';
import { MatDialog } from '@angular/material/dialog';
import { AddEditArtistComponent } from './components/add-edit-artist/add-edit-artist.component';
import { AlertService } from '../../../shared/services/alert/alert.service';

@Component({
  selector: 'app-admin-artists',
  standalone: true,
  imports: [BackendTableComponent],
  templateUrl: './admin-artists.component.html',
  styleUrl: './admin-artists.component.scss'
})
export class AdminArtistsComponent implements OnInit {

  constructor(
    public apiService: AdminArtistsService,
    public tableService: AdminArtistsTableService,
    private matDialog: MatDialog,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.setDefaultOperations();
    this.setGroupOperations();
  }

  setDefaultOperations(): void {
    this.tableService.operations = [
      {
        title: "Add",
        method: () => {
          this.matDialog.open(AddEditArtistComponent).afterClosed().subscribe({
            next: (data) => {
              if(data) {
                this.alertService.showDefaultMessage("Successfully added artist.")
                this.tableService.refreshStorage();
              }
            }
          });
        }
      },
      {
        title: "Edit",
        method: (artist: IArtist) => {
          this.matDialog.open(AddEditArtistComponent, {data: artist}).afterClosed().subscribe({
            next: (data) => {
              if(data) {
                this.tableService.refreshStorage();
                this.alertService.showDefaultMessage("Successfully updated artist.")
              }
            }
          });
        }
      },
      {
        title: "Delete"
      }
    ];
  }

  setGroupOperations(): void {
    this.tableService.groupOperations = [
      {
        title: "Delete"
      }
    ];
  }
}
