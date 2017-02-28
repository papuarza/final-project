import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SortableItem } from './../shared/interfaces/sortable-item.interface';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'trello-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card: SortableItem;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {}

  openCardModal(card) {
    const modalInstance = this.modalService.open(ModalComponent);
    modalInstance.componentInstance.card = card;

    modalInstance
      .result.then((result) => {
        console.log(`Dismissed ${result}`);
      }, (reason) => {
        console.log(`Dismissed ${reason}`);
      });
  }

}
