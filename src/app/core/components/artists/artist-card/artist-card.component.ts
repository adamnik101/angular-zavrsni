import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { IArtist } from '../../../interfaces/artist/i-artist';
import { RouterLink } from '@angular/router';
import { PlayAllButtonComponent } from '../../play-all-button/play-all-button.component';
import { ArtistsService } from '../../../services/artists/base/artists.service';
import { DominantColorService } from '../../../../shared/services/dominant-color/dominant-color.service';

@Component({
  selector: 'app-artist-card',
  standalone: true,
  imports: [RouterLink, PlayAllButtonComponent],
  templateUrl: './artist-card.component.html',
  styleUrl: './artist-card.component.scss'
})
export class ArtistCardComponent implements AfterViewInit{

  constructor(
    public apiService: ArtistsService,
    private dominantColorService: DominantColorService
  ) {}

  @Input() public artist: IArtist = {} as IArtist;

  @ViewChild('card') public cardElement!: ElementRef;
  @ViewChild('myCanvas', {static: false}) myCanvas!: ElementRef;
  @ViewChild('image') image!: ElementRef;
  
  private cardColor: string = "#23232375";
  private cardHoverColor: string = "";

  playAll(event: any): void {
    console.log(event)
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
