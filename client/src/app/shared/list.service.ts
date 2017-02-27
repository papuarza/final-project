import { OrderByPipe } from './order-by.pipe';
import { CardService } from './card.service';
import { forEach } from '@angular/router/src/utils/collection';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as _ from 'lodash';

import { List } from './../list/list.model';


@Injectable()
export class ListService {

  BASE = 'http://localhost.com:3000/api';
  LIST = '/list';
  lists: Array<List> = [];

  constructor(
    private http: Http,
    private cardService: CardService,
    private orderByPipe: OrderByPipe
  ) { }

  get() {
    return this.http.get(`${this.BASE}${this.LIST}/`)
      .map((res) => res.json())
      .map((res) => {
        for (const list of res) {
          this.lists.push(new List(list));
        }
        return this.lists;
      })
      .catch((err) => Observable.throw(err));
  }

  add(list) {
    return this.http.post(`${this.BASE}${this.LIST}/`, list)
      .map((res) => res.json())
      .map((res) => {
        this.lists.push(new List(res));
        return this.lists;
      })
      .catch((err) => {
        return Observable.throw(err.json());
      });
  }

  edit(list) {
    return this.http.put(`${this.BASE}${this.LIST}/${list._id}`, list)
      .map((res) => res.json())
      .catch((err) => Observable.throw(err.json()));
  }

  remove(list) {
    return this.http.delete(`${this.BASE}${this.LIST}/${list._id}`)
      .map((res) => res.json())
      .catch((err) => Observable.throw(err.json()));
  }

  print() {
    console.log('List Service:', this.lists);
  }

  shiftCard(listId, cardId) {
    const list = _.find(this.lists, { _id: listId });
    const _index = _.findIndex(list.cards, { _id: cardId });

    console.log('Updating at index', _index);

    if (_index !== -1) {
      if (_index === 0) {
        list.cards[0].position = list.cards[1].position - 1000;
      } else {
        if (list.cards[_index - 1] && list.cards[_index + 1]) {
          list.cards[_index].position = (list.cards[_index - 1].position + list.cards[_index + 1].position) / 2;
        } else {
          list.cards[_index].position = list.cards[_index - 1].position + 1000;
        }
      }

      const subscription = this.cardService.edit(list.cards[_index]).subscribe(
        (res) => console.log('Update card position', res),
        (err) => console.log('Update card error', err)
      );
    }

    list.cards = this.orderByPipe.transform(list.cards);
  }

}
