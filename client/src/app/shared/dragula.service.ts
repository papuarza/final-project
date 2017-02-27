import { Injectable } from '@angular/core';
import { DragulaService } from 'ng2-dragula/components/dragula.provider';
import { ListService } from './list.service';
import { CardService } from './card.service';

@Injectable()
export class DragulaHandler {

  constructor(
    private dragulaService: DragulaService,
    private listService: ListService,
    private cardService: CardService
  ) {
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

      const element = value[1].id;
      const to = value[2].id;
      const from = value[3].id;

      if (from === to) {
        this.sortCard();
        this.listService.print();
        this.listService.shiftCard(from, to, element);
      } else {
        this.listService.shiftCard(from, to, element);
      }

    });

    this.dragulaService.removeModel.subscribe((value) => {
      console.log(`removeModel`, value);
    });
  }

  sortCard() {

  }
}
