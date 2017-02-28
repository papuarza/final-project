import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DragulaHandler } from './../shared/dragula.service';
import { List } from './../list/list.model';
import { Card } from './../card/card.model';
import { ListService } from './../shared/list.service';
import { CardService } from './../shared/card.service';
import * as _ from 'lodash';

@Component({
  selector: 'trello-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  lists: Array<List> = [];
  cards: Array<Card> = [];
  error: any;
  feedback: any;

  toggleCreateList = false;

  @ViewChild('confirmModal') confirmModal;
  @ViewChild('newlist') newlist;

  constructor(
    private listService: ListService,
    private cardService: CardService,
    private modalService: NgbModal,
    private dragulaHandler: DragulaHandler
  ) { }

  ngOnInit() {
    this.fetchLists();
    this.dragulaHandler.listenTo();
  }

  toggleAddList() {
    this.toggleCreateList = !this.toggleCreateList;
  }

  fetchLists() {
    this.listService.get()
      .subscribe(
        (lists: Array<List>) => {
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
        (response) => {
          this.feedback = response.message;
          list.update(response.list);
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

  addList(title) {
    this.listService.create({ title })
      .subscribe(
        (newLists: Array<List>) => this.lists = newLists,
        (err) => this.error = err.message
      );
  }
}
