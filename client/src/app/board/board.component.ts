import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { List } from './../list/list.model';
import { ListService } from './../shared/list.service';

@Component({
  selector: 'trello-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  providers: [ListService]
})
export class BoardComponent implements OnInit {

  lists: Array<List> = [];
  error: any;
  feedback: any;

  @ViewChild('confirmModal') confirmModal;

  constructor(
    private listService: ListService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
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

  addList(name) {
    console.log('Adding list:', name);
    if (name) {
      this.listService.add({
        title: name,
        position: this.lists.length * 100
      }).subscribe(
        (newList) => {
          this.lists.push(newList);
        },
        (err) => {
          this.error = err;
        }
      );
    }
  }

  onListEdit(list) {
    this.listService.edit(list)
      .subscribe(
        (res) => {
          this.feedback = res.message;
          this.lists[this.lists.indexOf(list)] = res.list;
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
