import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Card } from './../card/card.model';


@Injectable()
export class CardService {

  BASE = 'http://localhost.com:3000/api';
  CARD = '/card';
  cards: Array<Card> = [];

  constructor(private http: Http) { }

  get() {
    return this.http.get(`${this.BASE}${this.CARD}/`)
      .map((res) => res.json())
      .do((res) => {
        console.log('res', res);
        for (const card of res) {
          this.cards.push(new Card(card));
        }
        return res;
      })
      .catch((err) => Observable.throw(err));
  }

  add(card) {
    return this.http.post(`${this.BASE}${this.CARD}/`, card)
      .map((res) => res.json())
      .catch((err) => {
        console.info('Something went wrong', err);
        return Observable.throw(err.json());
      });
  }

  edit(card) {
    return this.http.put(`${this.BASE}${this.CARD}/${card._id}`, card)
      .map((res) => res.json())
      .catch((err) => Observable.throw(err.json()));
  }

  remove(card) {
    return this.http.delete(`${this.BASE}${this.CARD}/${card._id}`)
      .map((res) => res.json())
      .catch((err) => Observable.throw(err.json()));
  }

}
