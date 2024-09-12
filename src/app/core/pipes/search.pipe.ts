import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(arrayOfObj:any[] , klma:string): any[] {
    return arrayOfObj.filter((item) => item.title.toLowerCase().includes(klma.toLowerCase()));
  }

}
