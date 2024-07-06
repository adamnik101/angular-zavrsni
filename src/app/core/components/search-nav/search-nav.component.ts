import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonInputComponent } from '../../../shared/form-fields/common-input/common-input.component';
import { CommonInputType } from '../../../shared/form-fields/common-input/interfaces/i-common-input';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../../user/services/user/user.service';
import { MatButtonModule, MatFabButton } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-nav',
  standalone: true,
  imports: [MatToolbarModule, CommonInputComponent, MatButtonModule, MatMenuModule, MatIconModule, MatFabButton],
  templateUrl: './search-nav.component.html',
  styleUrl: './search-nav.component.scss'
})
export class SearchNavComponent {

  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService
  ) {}

  public commonInputType = CommonInputType;

  public form = this.formBuilder.group({
    search: this.formBuilder.control("")
  });
}
