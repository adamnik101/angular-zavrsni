import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation-link-item',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './navigation-link-item.component.html',
  styleUrl: './navigation-link-item.component.scss'
})
export class NavigationLinkItemComponent {
    @Input() title: string = "";
    @Input() routePath: string = "";
    @Input() icon: string = "";
}
