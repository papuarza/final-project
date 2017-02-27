import { Card } from './../card/card.model';
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

  shiftCard(sourceList, targetList, cardId) {
    const sList = _.find(this.lists, { _id: sourceList });
    const tList = _.find(this.lists, { _id: targetList });

    console.log('sList', sList);
    console.log('tList', tList);

    const _index = _.findIndex(tList.cards, { _id: cardId });
    const _el = <Card>_.find(tList.cards, { _id: cardId });

    console.log('Updating at index', _index);

    if (_index !== -1) {
      if (_index === 0) {
        if (tList.cards.length > 1) {
          _el.position = tList.cards[1].position - 1000;
        } else {
          _el.position = 0;
        }
      } else {
        if (tList.cards[_index - 1] && tList.cards[_index + 1]) {
          _el.position = (tList.cards[_index - 1].position + tList.cards[_index + 1].position) / 2;
        } else {
          _el.position = tList.cards[_index - 1].position + 1000;
        }
      }

      // Update with the latest list id
      _el.setList(tList._id);

      if (sourceList === targetList) {
        const subscription = this.cardService.edit(_el).subscribe(
          (res) => console.log('Update card position', res),
          (err) => console.log('Update card error', err)
        );
      } else {
        const subscription = this.cardService.transfer(_el, sourceList, targetList).subscribe(
          (res) => console.log('Update card position', res),
          (err) => console.log('Update card error', err)
        );
      }
    }

    tList.cards = this.orderByPipe.transform(tList.cards);
  }
}
