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
    this.cardService.add({
        title: title,
        position: this.getNewPosition(),
        list: this.list._id
    }).subscribe(
      (res) => this.list.cards.push(res),
      (err) => console.log('Card add error')
    );
  }

  getNewPosition(): Number {
    if (this.list.cards.length) {
      return this.list.cards[this.list.cards.length - 1].position;
    } else {
      return 1;
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
