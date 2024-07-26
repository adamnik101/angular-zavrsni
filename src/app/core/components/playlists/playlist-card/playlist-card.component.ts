import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
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
export class PlaylistCardComponent implements AfterViewInit {

  constructor(
    public apiService: PlaylistsService,
    private dominantColorService: DominantColorService
  ) {}
  
  @Input() public playlist: IPlaylist = {} as IPlaylist;
  @ViewChild('card') public cardElement!: ElementRef;
  @ViewChild('myCanvas', {static: false}) myCanvas!: ElementRef;
  @ViewChild('image') image!: ElementRef;
  
  private cardColor: string = "#23232375";
  private cardHoverColor: string = "";

  ngAfterViewInit(): void {
    this.image.nativeElement.onload = () => {
      this.cardHoverColor = this.dominantColorService.getDominantColorFromImage(this.image.nativeElement, this.myCanvas.nativeElement);
    }
  }

  playAll(event: any): void {

  }

  applyBackground(): void {
    this.cardElement.nativeElement.style.backgroundColor = this.cardHoverColor; 
  }

  removeBackground(): void {
    this.cardElement.nativeElement.style.backgroundColor = this.cardColor; 
  }
}
