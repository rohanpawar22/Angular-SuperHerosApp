import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitBase'
})
export class SplitBasePipe implements PipeTransform {

  transform(value: any, ...args: any[]) {
    if(!value){
      return;
    } else {
      return value.split(/[,;]/).slice(0,1);
    }

  }

}
