import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { IPlaylist } from '../../../interfaces/playlist/i-playlist';
import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlayAllButtonComponent } from '../../play-all-button/play-all-button.component';
import { PlaylistsService } from '../../../services/playlists/base/playlists.service';
import { DominantColorService } from '../../../../shared/services/dominant-color/dominant-color.service';

@Component({
  selector: 'app-playlist-card',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, DecimalPipe, PlayAllButtonComponent],
  templateUrl: './playlist-card.component.html',
  styleUrl: './playlist-card.component.scss'
})
export class PlaylistCardComponent {

  constructor(
    public apiService: PlaylistsService,
    private dominantColorService: DominantColorService
  ) {}
  
  @Input() public playlist: IPlaylist = {} as IPlaylist;
  @ViewChild('card') public cardElement!: ElementRef;
  @ViewChild('myCanvas', {static: false}) myCanvas!: ElementRef;
  @ViewChild('preview', {static: false}) preview!: ElementRef;

  playAll(event: any): void {

  }

  applyBackground(): void {
    const image = new Image();
    image.crossOrigin = 'anonymous'

    image.onload = () => {
      this.dominantColorService.getDominantColorFromImage(image, this.preview, this.myCanvas.nativeElement, this.cardElement.nativeElement)
    }

    image.src = this.playlist.image_url;
  }

  removeBackground(): void {
    this.cardElement.nativeElement.style.backgroundColor = '#000' 
  }
}
