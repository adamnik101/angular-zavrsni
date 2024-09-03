import { Component, OnInit } from '@angular/core';
import { BackendTableComponent } from "../../../shared/components/backend-table/backend-table.component";
import { AdminGenresService } from './services/api/admin-genres.service';
import { AdminGenresTableService } from './services/table/admin-genres-table.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditGenreComponent } from './components/add-edit-genre/add-edit-genre.component';
import { IGenre } from '../../../core/interfaces/genre/i-genre';

@Component({
  selector: 'app-admin-genres',
  standalone: true,
  imports: [BackendTableComponent],
  templateUrl: './admin-genres.component.html',
  styleUrl: './admin-genres.component.scss'
})
export class AdminGenresComponent implements OnInit {

  constructor(
    public apiService: AdminGenresService,
    public tableService: AdminGenresTableService,
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
          this.matDialog.open(AddEditGenreComponent).afterClosed().subscribe({
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
        method: (genre: IGenre) => {
          this.matDialog.open(AddEditGenreComponent, {data: genre}).afterClosed().subscribe({
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
