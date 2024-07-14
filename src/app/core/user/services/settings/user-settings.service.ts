import { Injectable, signal } from '@angular/core';
import { ISettings } from '../../../../settings/interfaces/settings/i-settings';
import { ApiService } from '../../../../shared/base-logic/api/api.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../config/api-endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService extends ApiService<ISettings>{

  constructor(
    http: HttpClient
  ) {
    super(API_ENDPOINTS.user.settings, http);
   }

  settings = signal<ISettings>({} as ISettings);

  setSettings(settings: ISettings): void {
    this.settings.set(settings);
  }

  updateExplicit(value: boolean): void {
    this.settings.update(settings => {
      settings.explicit = value;

      return settings;
    })
  }
}
