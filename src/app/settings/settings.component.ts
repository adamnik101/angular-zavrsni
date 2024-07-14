import { Component } from '@angular/core';
import { UserSettingsService } from '../core/user/services/settings/user-settings.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatDivider } from '@angular/material/divider';
import { AlertService } from '../shared/services/alert/alert.service';

@Component({
  standalone: true,
  imports: [MatSlideToggleModule, FormsModule, MatDivider],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  constructor(
    public userSettingsService: UserSettingsService,
    private alertService: AlertService
  ) {

  }

  updateExplicit(): void {
    this.userSettingsService.updateExplicit(this.userSettingsService.settings().explicit);
    this.userSettingsService.post({setting: 'explicit', value: !this.userSettingsService.settings().explicit}).subscribe({
      next: (response) => {
        this.alertService.showDefaultMessage('Updated explicit content');
      }
    })
  }
}
