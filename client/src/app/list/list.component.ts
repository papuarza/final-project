import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DragulaService } from 'ng2-dragula';
import { List } from './list.model';
import { Card } from '../card/card.model';
import { CardService } from './../shared/card.service';
import { ModalComponent } from './../card/modal/modal.component';

@Component({
  selector: 'trello-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ CardService ]
})
export class ListComponent implements OnInit {

  @Input() list: List;
  @Output() onListRemove = new EventEmitter<List>();
  @Output() onListEdit = new EventEmitter<List>();

  @ViewChild('cardModal') cardModal;

  constructor(
    private cardService: CardService,
    private modalService: NgbModal,
    private dragulaService: DragulaService
  ) { }

  ngOnInit() {

    this.dragulaService.drag.subscribe((value) => {
      console.log(`drag:`, value);
      //this.onDrag(value.slice(1));
    });

    this.dragulaService.drop.subscribe((value) => {
      console.log(`drop:`, value);
      //this.onDrop(value.slice(1));
    });

    this.dragulaService.over.subscribe((value) => {
      console.log(`over:`, value);
      //this.onOver(value.slice(1));
    });

    this.dragulaService.out.subscribe((value) => {
      console.log(`out:`, value);
      //this.onOut(value.slice(1));
    });

    this.dragulaService.dropModel.subscribe((value) => {
      console.log('dropModel', value);
      //this.onDropModel(value.slice(1));
      console.log('this.list', this.list);
    });

  }

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
