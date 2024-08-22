import { Component } from '@angular/core';
import { BackendTableComponent } from "../../../shared/components/backend-table/backend-table.component";
import { AdminTracksService } from './services/api/admin-tracks.service';
import { AdminTracksTableService } from './services/table/admin-tracks-table.service';

@Component({
  selector: 'app-admin-tracks',
  standalone: true,
  imports: [BackendTableComponent],
  templateUrl: './admin-tracks.component.html',
  styleUrl: './admin-tracks.component.scss'
})
export class AdminTracksComponent {

  constructor(
    public apiService: AdminTracksService,
    public tableService: AdminTracksTableService
  ) {}
}
