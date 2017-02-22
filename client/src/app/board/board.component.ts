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
        (res) => console.log('Added', res),
        (err) => {
          this.error = err;
        }
      );
    }
  }

  onListRemove(list) {
    this.modalService
      .open(this.confirmModal)
      .result.then((result) => {
        console.log(`Closed with: ${result}`);
      }, (reason) => {
        console.log(`Dismissed ${reason}`);
      });
  }
}
