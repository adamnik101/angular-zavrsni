import { NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { SmallRoundDividerComponent } from '../../../../shared/components/small-round-divider/small-round-divider.component';
import { SectionHeaderComponent } from '../../section-header/section-header.component';
import { SmallHeaderComponent } from '../../small-header/small-header.component';
import { TracksTableComponent } from '../../tracks/tracks-table/tracks-table.component';
import { AlbumCardComponent } from '../album-card/album-card.component';
import { AlbumsService } from '../../../services/albums/base/albums.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TracksTableService } from '../../../services/tracks/table/tracks-table.service';
import { UserAlbumLikesService } from '../../../user/services/albums/user-album-likes.service';
import { LikedTracksService } from '../../../user/services/liked-tracks/liked-tracks.service';
import { AlertService } from '../../../../shared/services/alert/alert.service';
import { Subscription } from 'rxjs';
import { SpinnerFunctions } from '../../../static/spinner-functions';
import { IAlbum } from '../../../interfaces/album/i-album';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [NgOptimizedImage, MatIcon, MatTooltip, SmallRoundDividerComponent, TracksTableComponent, AlbumCardComponent,
    SectionHeaderComponent, SmallHeaderComponent, MatFabButton, RouterLink],
  templateUrl: './album-detail.component.html',
  styleUrl: './album-detail.component.scss'
})
export class AlbumDetailComponent implements OnInit, OnDestroy {

  constructor(
    private albumsService: AlbumsService,
    private route: ActivatedRoute,
    private tracksTableService: TracksTableService,
    public userAlbumLikes: UserAlbumLikesService,
    private likedTracksService: LikedTracksService,
    private alertService: AlertService
  ) {}

  @ViewChild('back') private back: ElementRef = {} as ElementRef;

  public album: IAlbum = {} as IAlbum;
  public liked: boolean = false;

  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(
      this.route.paramMap.subscribe({
        next: (data) => {
          const id = data.get('id');

          if(id) {
            this.liked = false;

            SpinnerFunctions.showSpinner();

            this.albumsService.get<IAlbum>(id).subscribe({
              next: (response) => {
                this.album = response.data;
                this.back.nativeElement.style.backgroundImage = `url(${this.album.cover})`;

                this.album.tracks.forEach(track => {
                  track['liked'] = this.likedTracksService.likedTracks().some(t => t.id === track.id);
                });

                const isLiked = this.userAlbumLikes.albums().findIndex(album => album.id === this.album.id);
                if(isLiked !== -1) {
                  this.liked = true;
                }

                this.tracksTableService.setTracks(this.album.tracks);

                SpinnerFunctions.hideSpinner();
              }
            })
          }
        }
      })
    );
  }

  saveAlbum(): void {
    this.userAlbumLikes.saveAlbum(this.album.id).subscribe({
      next: (data) => {
        this.liked = true;

        this.alertService.showDefaultMessage("Added to your library.");
        this.userAlbumLikes.getAlbums();
      }
    })
  }

  removeFromSaved(): void {
    this.userAlbumLikes.removeFromSaved(this.album.id).subscribe({
      next: (data) => {
        this.liked = false;

        this.alertService.showDefaultMessage("Removed from library.");
        this.userAlbumLikes.getAlbums();
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
