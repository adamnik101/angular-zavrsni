import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FooterComponent } from './footer/footer.component';
import { slideInAnimation } from '../shared/animations/animations';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MatToolbarModule, HeaderComponent, SidenavComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  animations: [
    slideInAnimation,
  ]
})
export class LayoutComponent {

}
