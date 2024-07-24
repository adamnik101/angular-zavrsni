import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IAlbum } from '../../../interfaces/album/i-album';
import { PlayAllButtonComponent } from '../../play-all-button/play-all-button.component';
import { AlbumsService } from '../../../services/albums/base/albums.service';
import { QueueService } from '../../../services/queue/base/queue.service';
import { DominantColorService } from '../../../../shared/services/dominant-color/dominant-color.service';

@Component({
  selector: 'app-album-card',
  standalone: true,
  imports: [RouterLink, PlayAllButtonComponent],
  templateUrl: './album-card.component.html',
  styleUrl: './album-card.component.scss'
})
export class AlbumCardComponent implements AfterViewInit {

  constructor(
    public apiService: AlbumsService,
    private queueService: QueueService,
    private dominantColorService: DominantColorService
  ) {}

  @Input() public album: IAlbum = {} as IAlbum;
  
  @ViewChild('card') public cardElement!: ElementRef;
  @ViewChild('myCanvas', {static: false}) myCanvas!: ElementRef;
  @ViewChild('image') image!: ElementRef;
  
  private cardColor: string = "#23232375";
  private cardHoverColor: string = "";

  playAll(event: any): void {
    
  }

  ngAfterViewInit(): void {
    this.image.nativeElement.onload = () => {
      this.cardHoverColor = this.dominantColorService.getDominantColorFromImage(this.image.nativeElement, this.myCanvas.nativeElement);
    }
  }

  applyBackground(): void {
    this.cardElement.nativeElement.style.backgroundColor = this.cardHoverColor; 
  }

  removeBackground(): void {
    this.cardElement.nativeElement.style.backgroundColor = this.cardColor; 
  }
}
