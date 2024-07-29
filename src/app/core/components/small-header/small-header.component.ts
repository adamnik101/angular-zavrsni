import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { DominantColorService } from '../../../shared/services/dominant-color/dominant-color.service';

@Component({
  selector: 'app-small-header',
  standalone: true,
  imports: [],
  templateUrl: './small-header.component.html',
  styleUrl: './small-header.component.scss',
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateY(0)', opacity: 1})),
      transition('void => *', [
        style({  transform: 'translateY(-200px)', opacity: 0}),
        animate('0.3s ease-in-out')
      ]),
      transition('* => void', [
        animate('0.3s ease-in-out', style({  transform: 'translateY(-200px)', opacity: 0}))
      ])
    ])
  ]
})
export class SmallHeaderComponent implements OnInit {

  constructor(
    private dominantColorService: DominantColorService
  ) { }

  @Input() public title: string = '';
  @Input() public image: string = '';

  @ViewChild('wrapper') public wrapper!: ElementRef;
  @ViewChild('imageEl') public imageElement!: ElementRef;
  @ViewChild('canvas') public canvas!: ElementRef;

  public shouldShowHeader: boolean = false;
  private hasRun: boolean = false;
  ngOnInit(): void {
    
    const element = document.getElementById('content-wrapper');

    element?.addEventListener("scroll", (event: any) => {
      const distanceToTop = event.target.scrollTop;
      this.shouldShowHeader = distanceToTop >= 100;
    }); 
  }

  handleImageLoad (event: any){
    const color = this.dominantColorService.getDominantColorFromImage(this.imageElement.nativeElement, this.canvas.nativeElement);
    console.log(color);
    this.wrapper.nativeElement.style.background = color;
  }
}
