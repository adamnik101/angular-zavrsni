import { Component, OnInit } from '@angular/core';
import { BackendTableComponent } from "../../../shared/components/backend-table/backend-table.component";
import { AdminAlbumsService } from './services/api/admin-albums.service';
import { AdminAlbumsTableService } from './services/table/admin-albums-table.service';

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
    public tableService: AdminAlbumsTableService
  ) {}

  ngOnInit(): void {
    this.tableService.addDefaultOperation();
    
  }
}
