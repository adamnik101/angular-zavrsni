import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-admin-dashboard-card',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './admin-dashboard-card.component.html',
  styleUrl: './admin-dashboard-card.component.scss'
})
export class AdminDashboardCardComponent {

  @Input() public title: string | null = null;
  @Input() public data: any;
  @Input() public icon: string = "";
}
