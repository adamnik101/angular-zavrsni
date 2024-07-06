import { Component } from '@angular/core';
import { MAIN_NAVIGATION_LINKS } from '../../core/consts/main-navigation-links';
import { IMainNavigationLink } from '../../core/interfaces/i-main-navigation-link';
import { NavigationLinkItemComponent } from './navigation-link-item/navigation-link-item.component';
import { MatDividerModule } from '@angular/material/divider';
import { AUTH_NAVIGATION_LINKS } from '../../core/consts/auth-navigation-links';
import { UserService } from '../../core/user/services/user/user.service';
import { USER_NAVIGATION_LINKS } from '../../core/consts/user-navigation-links';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [NavigationLinkItemComponent, MatDividerModule],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.scss'
})
export class LeftSidebarComponent {

  constructor(
    public userService: UserService
  ) {}
  
  public mainNavigationLinks: IMainNavigationLink[] = MAIN_NAVIGATION_LINKS;
  public authNavigationLinks: IMainNavigationLink[] = AUTH_NAVIGATION_LINKS;
  public userNavigationLinks: IMainNavigationLink[] = USER_NAVIGATION_LINKS;
}
