import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Card } from './../card.model';
import { CardService } from './../../shared/card.service';

@Component({
  selector: 'trello-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() card: Card;

  dueDateDT: NgbDateStruct;
  editingDescription = false;
  editingDate = false;

  constructor(
    public activeModal: NgbActiveModal,
    private cardService: CardService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    public toastr: ToastsManager
  ) { }

  ngOnInit() {
    if (this.card.dueDate) {
      this.dueDateDT = this.ngbDateParserFormatter.parse(this.card.dueDate.toString());
    }
  }

  onSelectDate(date: NgbDateStruct) {
    if (date) {
      this.card.dueDate = new Date(date.year, date.month - 1, date.day);
    }
  }

  deleteCard() {
    this.cardService.remove(this.card)
      .subscribe(
        (response) => {
          this.activeModal.close();
          this.onSuccess(response.message);
        },
        (err) => this.onError(err.message)
      );
  }

  editCard(field) {
    this.cardService.edit(this.card)
      .subscribe(
        (response) => {
          this.editingDescription = false;
          this.editingDate = false;
          this.onSuccess(response.message)
        },
        (err) => this.onError(err.message)
      );
  }

  toggleDescription() {
    this.editingDescription = !this.editingDescription;
  }

  toggleDate() {
    this.editingDate = !this.editingDate;
  }

  onSuccess(message: string) {
    this.toastr.success('Yayy!', message);
  }

  onError(error: string) {
    this.toastr.error('Oops :(', error);
  }
}
