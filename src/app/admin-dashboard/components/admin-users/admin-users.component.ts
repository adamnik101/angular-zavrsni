import { Component, OnInit } from '@angular/core';
import { AdminUsersService } from './services/api/admin-users.service';
import { BackendTableComponent } from "../../../shared/components/backend-table/backend-table.component";
import { AdminUsersTableService } from './services/table/admin-users-table.service';
import { IUser } from '../../../core/interfaces/user/i-user';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [BackendTableComponent],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss'
})
export class AdminUsersComponent implements OnInit {

  constructor(
    public apiService: AdminUsersService,
    public adminUsersTableService: AdminUsersTableService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.setDefaultOperations();
    this.setGroupOperations();
  }

  setDefaultOperations(): void {
    this.adminUsersTableService.operations = [
      {
        title: "Edit",
        method: (row: IUser) => {
          this.matDialog.open(AddEditUserComponent, {data: row});
        }
      },
      {
        title: "Delete"
      }
    ];
  }

  setGroupOperations(): void {
    this.adminUsersTableService.groupOperations = [
      {
        title: "Delete",
        method: (row: IUser) => {
          console.log(this.adminUsersTableService.selectedRowIds);
        }
      }
    ]
  }
}
