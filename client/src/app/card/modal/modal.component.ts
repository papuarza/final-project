import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Card } from './../card.model';
import { CardService } from './../../shared/card.service';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

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
  feedback: String;

  constructor(
    public activeModal: NgbActiveModal,
    private cardService: CardService,
    private ngbDateParserFormatter: NgbDateParserFormatter
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
        (res) => this.activeModal.close()
      );
  }

  editCard(field) {
    this.cardService.edit(this.card)
      .subscribe(
        (res) => {
          this.feedback = res.message;
          this.editingDescription = false;
          this.editingDate = false;
        }
      );
  }

  toggleDescription() {
    this.editingDescription = !this.editingDescription;
  }

  toggleDate() {
    this.editingDate = !this.editingDate;
  }

}
