import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LeftSidebarComponent } from '../left-sidebar/left-sidebar.component';
import { RouterOutlet } from '@angular/router';
import { SearchNavComponent } from '../../core/components/search-nav/search-nav.component';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, LeftSidebarComponent, RouterOutlet, SearchNavComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

}
