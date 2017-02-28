import { EventEmitter } from '@angular/forms/src/facade/async';
import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'trello-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.scss']
})
export class PlaceholderComponent {

  isEditing = false;

  @Input() placeholder: string;
  @Output() onSave = new EventEmitter<string>();
  title: string;

  constructor() { }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  save() {
    this.onSave.emit(this.title);
    this.title = '';
    this.toggleEdit();
  }
}
