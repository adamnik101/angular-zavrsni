import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slice',
  pure: true,
  standalone: true
})
export class SlicePipe implements PipeTransform {

  transform(arrayToSlice: any[], sliceUpTo: number): any[] {
    let arr = arrayToSlice;

    return arr.slice(0, sliceUpTo);
  }

}
