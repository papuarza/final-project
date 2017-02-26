import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DragulaService } from 'ng2-dragula';
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
    private modalService: NgbModal,
    private dragulaService: DragulaService
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
