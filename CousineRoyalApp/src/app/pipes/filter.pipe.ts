import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filters: string[], property: string): any[] {
    const results : any[] = [];
    let filt = filters
  
    if(value.length === 0 || filters.length === 0 || property === '') {
      
      return value;
    }

    for (const item of value) {
        filters.forEach(filter => {
          if (item[property].includes(filter))
          {
            results.push(item);
          }
        });  
    }
    return results;
  }

}
