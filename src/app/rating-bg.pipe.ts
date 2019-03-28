import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratingBg'
})
export class RatingBgPipe implements PipeTransform {

  transform(value: number): string {
    let ratingClass;

    if (value <= 2) {
      ratingClass = 'bad';
    }

    if (value > 2 && value <= 4) {
      ratingClass = 'poor';
    }

    if (value > 4 && value <= 6) {
      ratingClass = 'ok';
    }

    if (value > 6 && value <= 8) {
      ratingClass = 'good';
    }

    if (value > 8) {
      ratingClass = 'great';
    }

    return `--${ratingClass}`;
  }
}
