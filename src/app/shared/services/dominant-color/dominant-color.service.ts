import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DominantColorService {

  constructor() { }

  getDominantColorFromImage(image: any, preview: any, canvas: any, elementToApply: any): void {

    let ctx = canvas.getContext('2d');
    console.log(ctx)
    canvas.width = 1;
    canvas.height = 1;

    preview.width = 400;
    preview.height = 400;
    const _that = this;
    function getDominantColor(imageObject: any) {
      //draw the image to one pixel and let the browser find the dominant color
      ctx.drawImage(imageObject, 0, 0, 1, 1);

      //get pixel color
      const i = ctx.getImageData(0, 0, 1, 1).data;

      console.log(`rgba(${i[0]},${i[1]},${i[2]},${i[3]})`);
      console.log(_that.lightOrDark(`rgba(${i[0]},${i[1]},${i[2]},${i[3]})`));
      console.log(
        '#' +
          ((1 << 24) + (i[0] << 16) + (i[1] << 8) + i[2]).toString(16).slice(1)
      );

      elementToApply.style.backgroundColor = `rgba(${i[0]},${i[1]},${i[2]}, 0.3)`
    }

    
      const reader = new FileReader();

          getDominantColor(image);
       
  }

 public lightOrDark = (color: any) => {
    console.log({ color });
    // Variables for red, green, blue values
    var r, g, b, hsp;

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {
      // If RGB --> store the red, green, blue values in separate variables
      color = color.match(
        /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
      );

      r = color[1];
      g = color[2];
      b = color[3];
    } else {
      // If hex --> Convert it to RGB: http://gist.github.com/983661
      color = +(
        '0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&')
      );

      r = color >> 16;
      g = (color >> 8) & 255;
      b = color & 255;
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 127.5) {
      return 'light';
    } else {
      return 'dark';
    }
  }

}
