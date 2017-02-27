import { Injectable } from '@angular/core';
import { DragulaService } from 'ng2-dragula/components/dragula.provider';

@Injectable()
export class DragulaHandler {

  constructor(private dragulaService: DragulaService) {
    dragulaService.setOptions('lists', {
      moves: function (el, container, handle) {
        return handle.tagName === 'TRELLO-LIST';
      }
    });
  }

  listenTo() {
    this.dragulaService.dropModel.subscribe((value) => {
      console.log('Value', value);
      console.log('Element', value[1].id);
      console.log('From', value[3].id);
      console.log('To', value[2].id);
    });

    this.dragulaService.removeModel.subscribe((value) => {
      console.log(`removeModel`, value);
    });
  }
}
