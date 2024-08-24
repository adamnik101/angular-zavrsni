import { Component, OnInit } from '@angular/core';
import { BackendTableComponent } from "../../../shared/components/backend-table/backend-table.component";
import { AdminAlbumsService } from './services/api/admin-albums.service';
import { AdminAlbumsTableService } from './services/table/admin-albums-table.service';
import { IAlbum } from '../../../core/interfaces/album/i-album';
import { AddEditAlbumsComponent } from './components/add-edit-albums/add-edit-albums.component';
import { MatDialog } from '@angular/material/dialog';

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
          this.matDialog.open(AddEditAlbumsComponent, {data: null})
        }
      },
      {
        title: "Edit",
        method: (album: IAlbum) => {
          this.matDialog.open(AddEditAlbumsComponent, {data: album})
        }
      },
      {
        title: "Delete",
        method: (album: IAlbum) => {
          console.log(album);
        }
      }
    ];
  }

  setGroupOperations(): void {
    this.tableService.groupOperations = [
      {
        title: "Delete",
        method: () => {
          console.log(this.tableService.selectedRowIds)
        }
      }
    ]
  }
}
