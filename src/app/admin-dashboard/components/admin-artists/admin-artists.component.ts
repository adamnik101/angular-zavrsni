import { Component } from '@angular/core';
import { BackendTableComponent } from "../../../shared/components/backend-table/backend-table.component";
import { AdminArtistsService } from './services/api/admin-artists.service';
import { AdminArtistsTableService } from './services/table/admin-artists-table.service';

@Component({
  selector: 'app-admin-artists',
  standalone: true,
  imports: [BackendTableComponent],
  templateUrl: './admin-artists.component.html',
  styleUrl: './admin-artists.component.scss'
})
export class AdminArtistsComponent {

  constructor(
    public apiService: AdminArtistsService,
    public tableService: AdminArtistsTableService
  ) {}
}
