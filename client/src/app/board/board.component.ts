import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DragulaService } from 'ng2-dragula';
import { List } from './../list/list.model';
import { Card } from './../card/card.model';
import { ListService } from './../shared/list.service';
import { CardService } from './../shared/card.service';

@Component({
  selector: 'trello-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  providers: [
    ListService,
    CardService
  ]
})
export class BoardComponent implements OnInit {

  lists: Array<List> = [];
  cards: Array<Card> = [];
  error: any;
  feedback: any;

  @ViewChild('confirmModal') confirmModal;

  constructor(
    private listService: ListService,
    private cardService: CardService,
    private modalService: NgbModal,
    private dragulaService: DragulaService
  ) { }

  ngOnInit() {
    this.fetchLists();

    this.dragulaService.drag.subscribe((value) => {
      console.log(`drag: ${value[0]}`);
      //this.onDrag(value.slice(1));
    });

    this.dragulaService.drop.subscribe((value) => {
      console.log(`drop: ${value[0]}`);
      //this.onDrop(value.slice(1));
    });

    this.dragulaService.over.subscribe((value) => {
      console.log(`over: ${value[0]}`);
      //this.onOver(value.slice(1));
    });

    this.dragulaService.out.subscribe((value) => {
      console.log(`out: ${value[0]}`);
      //this.onOut(value.slice(1));
    });

    this.dragulaService.setOptions('lists', {
      moves: function (el, container, handle) {
        return handle.tagName === 'TRELLO-LIST';
      }
    });
  }

  fetchLists() {
    this.listService.get()
      .subscribe(
        (lists) => {
          this.lists = lists;
          this.error = false;
          console.log('GET this.lists', this.lists);
        },
        (err) => {
          console.log('GET error', err);
          this.error = err;
        }
      );
  }

  onListEdit(list) {
    this.listService.edit(list)
      .subscribe(
        (res) => {
          this.feedback = res.message;
          list.update(res.list);
        },
        (err) => this.error = err.message
      );
  }

  onListRemove(list) {
    this.modalService
      .open(this.confirmModal)
      .result.then((result) => {
        this.removeList(list);
      }, (reason) => {
        console.log(`Dismissed ${reason}`);
      });
  }

  removeList(list) {
    this.listService.remove(list)
      .subscribe(
        (res) => {
          this.feedback = res.message;
          this.lists.splice(this.lists.indexOf(list), 1);
        },
        (err) => this.error = err.message
      );
  }
}
