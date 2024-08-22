import { Component } from '@angular/core';
import { BackendTableComponent } from "../../../shared/components/backend-table/backend-table.component";
import { AdminGenresService } from './services/api/admin-genres.service';
import { AdminGenresTableService } from './services/table/admin-genres-table.service';

@Component({
  selector: 'app-admin-genres',
  standalone: true,
  imports: [BackendTableComponent],
  templateUrl: './admin-genres.component.html',
  styleUrl: './admin-genres.component.scss'
})
export class AdminGenresComponent {

  constructor(
    public apiService: AdminGenresService,
    public tableService: AdminGenresTableService
  ) {}
}
