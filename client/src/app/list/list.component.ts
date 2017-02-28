import { ListService } from './../shared/list.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { List } from './list.model';
import { Card } from '../card/card.model';
import { CardService } from './../shared/card.service';
import { ModalComponent } from './../card/modal/modal.component';

@Component({
  selector: 'trello-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() list: List;
  @Output() onListRemove = new EventEmitter<List>();
  @Output() onListEdit = new EventEmitter<List>();

  @ViewChild('cardModal') cardModal;

  constructor(
    private cardService: CardService,
    private listService: ListService,
    private modalService: NgbModal
  ) { }

  ngOnInit() { }

  removeList() {
    this.onListRemove.emit(this.list);
  }

  editList(title) {
    this.onListEdit.emit(this.list);
  }

  addCard(title) {
    this.listService.createCard({
        title: title,
        position: this.getNewPosition(),
        list: this.list._id
    }, this.list._id).subscribe(
      (cards: Array<Card>) => this.list.cards = cards,
      (err) => console.log('Card add error')
    );
  }

  getNewPosition(): number {
    if (this.list.cards.length) {
      return this.list.cards[this.list.cards.length - 1].position + 1000;
    } else {
      return 0;
    }
  }

  openCard(card) {
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
