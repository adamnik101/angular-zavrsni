import { Component, OnInit } from '@angular/core';
import { AdminUsersService } from './services/api/admin-users.service';
import { BackendTableComponent } from "../../../shared/components/backend-table/backend-table.component";
import { AdminUsersTableService } from './services/table/admin-users-table.service';

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
    public adminUsersTableService: AdminUsersTableService
  ) {}

  ngOnInit(): void {
    
  }
}
