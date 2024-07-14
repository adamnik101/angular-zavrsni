import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDurationFromSeconds',
  standalone: true
})
export class FormatDurationFromSecondsPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return calculate(+value);

    function calculate(seconds: number) {
      const minutes: number = Math.floor(seconds / 60);
      const remainingSeconds: number = seconds % 60;
      const formattedMinutes: string =
        minutes < 10 ? '0' + minutes : String(minutes);
      const formattedSeconds: string =
        remainingSeconds < 10 ? '0' + remainingSeconds : String(remainingSeconds);

      return `${formattedMinutes}:${formattedSeconds}`;
    }
  }

  

}
