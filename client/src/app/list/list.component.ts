import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { List } from './list.model';

@Component({
  selector: 'trello-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() list: List;
  @Output() onListRemove = new EventEmitter<List>();

  constructor() { }

  ngOnInit() { }

  removeList() {
    this.onListRemove.emit(this.list);
  }

}
