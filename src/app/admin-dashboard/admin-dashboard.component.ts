import { Component, OnInit, signal } from '@angular/core';
import { SpinnerFunctions } from '../core/static/spinner-functions';
import { AdminDashboardService } from './services/api/admin-dashboard.service';
import { IAdminDashboard } from './interfaces/i-admin-dashboard';
import { AdminDashboardCardComponent } from './components/admin-dashboard-card/admin-dashboard-card.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [AdminDashboardCardComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit{

  constructor(
    private apiService: AdminDashboardService
  ) {}

  public dashboardData = signal<IAdminDashboard | null>(null);

  ngOnInit(): void {
    this.getDashboardData();
  }

  getDashboardData(): void {
    SpinnerFunctions.showSpinner();
    this.apiService.getAll<IAdminDashboard>().subscribe({
      next: (data) => {
        this.dashboardData.set(data.data);
        SpinnerFunctions.hideSpinner();
      }
    })
  }

}
