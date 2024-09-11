import { Component, OnInit } from '@angular/core';
import { BackendTableComponent } from "../../../shared/components/backend-table/backend-table.component";
import { AdminAlbumsService } from './services/api/admin-albums.service';
import { AdminAlbumsTableService } from './services/table/admin-albums-table.service';
import { IAlbum } from '../../../core/interfaces/album/i-album';
import { AddEditAlbumsComponent } from './components/add-edit-albums/add-edit-albums.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '../../../shared/services/alert/alert.service';

@Component({
  selector: 'app-admin-albums',
  standalone: true,
  imports: [BackendTableComponent],
  templateUrl: './admin-albums.component.html',
  styleUrl: './admin-albums.component.scss'
})
export class AdminAlbumsComponent implements OnInit {

  constructor(
    public apiService: AdminAlbumsService,
    public tableService: AdminAlbumsTableService,
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
        method: (event: any) => {
          this.matDialog.open(AddEditAlbumsComponent, {data: null}).afterClosed().subscribe({
            next: (data) => {
              if(data) {
                this.tableService.refreshStorage();
              }
            }
          })
        }
      },
      {
        title: "Edit",
        method: (album: IAlbum) => {
          this.matDialog.open(AddEditAlbumsComponent, {data: album}).afterClosed().subscribe({
            next: (data) => {
              if(data) {
                this.tableService.refreshStorage();
              }
            }
          })
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
    ]
  }
}
