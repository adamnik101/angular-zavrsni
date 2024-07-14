import { Component, effect, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonInputComponent } from '../../../shared/form-fields/common-input/common-input.component';
import { CommonInputType } from '../../../shared/form-fields/common-input/interfaces/i-common-input';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../../user/services/user/user.service';
import { MatButtonModule, MatFabButton } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { USER_MENU_NAVIGATION_LINKS } from '../../consts/user-menu-navigation-links';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { debounceTime, Subscription } from 'rxjs';
import { SearchService } from '../../../search/services/api/search.service';
import { IMainNavigationLink } from '../../interfaces/i-main-navigation-link';
import { AuthService } from '../../../shared/auth/auth.service';

@Component({
  selector: 'app-search-nav',
  standalone: true,
  imports: [MatToolbarModule, CommonInputComponent, MatButtonModule, MatMenuModule, MatIconModule, MatFabButton, RouterLink],
  templateUrl: './search-nav.component.html',
  styleUrl: './search-nav.component.scss'
})
export class SearchNavComponent implements OnInit{

  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    effect(() => {
      if(this.userService.loggedIn()) {
        console.log('logged in')
        this.setUserMenuNavigationLinks();
      }
    })
  }

  public commonInputType = CommonInputType;
  public userMenuNavigationLinks: IMainNavigationLink[] = [];
  public subscription: Subscription = new Subscription();

  public form = this.formBuilder.group({
    search: this.formBuilder.control("")
  });

  ngOnInit(): void {
    this.getQueryFromUrl();
    this.trackSearch();
  }

  getQueryFromUrl(): void {
    this.subscription.add(
      this.route.queryParams.subscribe({
        next: (data) => {
          if(data.hasOwnProperty('query')) {
            this.form.get("search")?.setValue(data['query'], {emitEvent: false});
          }
        }
      })
    );
  }

  trackSearch(): void {
    this.subscription.add(
      this.form.get('search')?.valueChanges.pipe(
        debounceTime(600)
      ).subscribe({
        next: (data) => {
          if(data) {
            this.performSearch(data);
          }
        }
      })
    );   
  }

  performSearch(query: string): void {
    this.searchService.query.next(query);
    this.router.navigateByUrl(`/search?query=${query}`);
  }

  onKeyEnter(value: string): void {
    this.performSearch(value);
  }
  
  setUserMenuNavigationLinks(): void {
    this.userMenuNavigationLinks = [
      {
        title: "Profile",
        routePath: "profile",
        icon: "account_box"
      },
      {
        title: "Settings",
        routePath: "settings",
        icon: "settings"
      },
      {
        title: "Logout",
        routePath: null,
        icon: "logout",
        method: () => {
           this.authService.logout()
        }
      }
    ]
  }
}
