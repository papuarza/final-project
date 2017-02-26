import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Card } from './../card.model';

@Component({
  selector: 'trello-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() card: Card;
  constructor(public activeModal: NgbActiveModal) { }
}
