import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toR'
})
export class ToRPipe implements PipeTransform {

  // transform(value: any, args?: any): any {
  //   return null;
  // }
  transform(value: string, args?: any): any {

    return value.replace(/\*/g, 'R');

  }
}
