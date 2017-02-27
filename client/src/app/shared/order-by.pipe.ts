import { SortableItem } from './sortable-item.interface';
import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'orderBy',
  pure: false
})
export class OrderByPipe implements PipeTransform {

  transform(items: Array<SortableItem>, args?: any): any {
    return _.orderBy(items, ['position', 'title']);
  }

}
