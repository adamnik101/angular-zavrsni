import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeService } from './services/api/home.service';
import { UserPlaylistsService } from '../core/user/services/playlists/user-playlists.service';
import { SpinnerFunctions } from '../core/static/spinner-functions';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{

  constructor(
    private apiService: HomeService,
    public playlistsService: UserPlaylistsService
  ) { }
  foods: any[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
  ngOnInit(): void {
    SpinnerFunctions.hideSpinner();
  }

  ngOnDestroy(): void {
  }
}
