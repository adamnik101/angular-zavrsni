import { Component, OnInit } from '@angular/core';
import { BackendTableComponent } from "../../../shared/components/backend-table/backend-table.component";
import { AdminTracksService } from './services/api/admin-tracks.service';
import { AdminTracksTableService } from './services/table/admin-tracks-table.service';
import { ITrack } from '../../../core/interfaces/tracks/i-track';
import { MatDialog } from '@angular/material/dialog';
import { AddEditTrackComponent } from './components/add-edit-track/add-edit-track.component';

@Component({
  selector: 'app-admin-tracks',
  standalone: true,
  imports: [BackendTableComponent],
  templateUrl: './admin-tracks.component.html',
  styleUrl: './admin-tracks.component.scss'
})
export class AdminTracksComponent implements OnInit {

  constructor(
    public apiService: AdminTracksService,
    public tableService: AdminTracksTableService,
    private matDialog: MatDialog
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
          this.matDialog.open(AddEditTrackComponent);
        }
      },
      {
        title: "Edit",
        method: (row: ITrack) => {
          this.matDialog.open(AddEditTrackComponent, {data: row});
        }
      },
      {
        title: "Delete",
        method: (row: ITrack) => {
          console.log(row);
        }
      }
    ];
  }

  setGroupOperations(): void {
    this.tableService.groupOperations = [
      {
        title: "Delete",
        method: (row: ITrack) => {
          console.log(this.tableService.selectedRowIds);
        }
      }
    ];
  }
  
}
