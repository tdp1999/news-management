import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderNumber'
})
export class OrderNumberPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
