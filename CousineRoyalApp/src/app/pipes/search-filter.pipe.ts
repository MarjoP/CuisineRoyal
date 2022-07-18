import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any[], searchText: string): any {
    return value ? value.filter(recipe => 
      recipe.Name.toLowerCase().includes(searchText.toLowerCase())): value;
  }

}
