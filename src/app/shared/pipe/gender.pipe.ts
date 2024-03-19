import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: any, ...args: any[]) {
    if(!value){
      return;
    }else {
      return value.charAt(0).toUpperCase();
    }
  }

}
