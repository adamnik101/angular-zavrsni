import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeService } from './services/api/home.service';
import { UserPlaylistsService } from '../core/user/services/playlists/user-playlists.service';
import { SpinnerFunctions } from '../core/static/spinner-functions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{

  constructor(
    private apiService: HomeService,
    public playlistsService: UserPlaylistsService
  ) { }

  ngOnInit(): void {
    SpinnerFunctions.hideSpinner();
  }

  ngOnDestroy(): void {
  }
}
