import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDateFromNow',
  standalone: true
})
export class FormatDateFromNowPipe implements PipeTransform {

  transform(value: any): any {
    if(value) {
      let counter: any;
      const seconds: number = Math.floor(+new Date() - +new Date(value) ) / 1000;
      const intervals: any = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
      };

      if(seconds < 29)
        return "Just now";
      
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if(counter > 0) {
          if(counter == 1) {
            return counter + ' ' + i + ' ago';
          }
          else{
            return counter + ' ' + i + 's ago';
          };
        };
      };
    };

    return value;
  }

}
