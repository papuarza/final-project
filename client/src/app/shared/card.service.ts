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

  constructor(private http: Http) {
    console.log('Init cardService');
  }

  get() {
    return this.http.get(`${this.BASE}${this.CARD}/`)
      .map((res) => res.json())
      .map((cards) => {
        console.log('cards', cards);
        for (const card of cards) {
          this.cards.push(new Card(card));
        }

        console.log('cards array local', this.cards);
        return this.cards;
      })
      .catch((err) => Observable.throw(err));
  }

  add(card) {
    return this.http.post(`${this.BASE}${this.CARD}/`, card)
      .map((res) => res.json())
      .map((_card) => {
        this.cards.push(new Card(_card));
        return this.cards;
      })
      .catch((err) => {
        console.info('Something went wrong', err);
        return Observable.throw(err.json());
      });
  }

  edit(card: Card) {
    return this.http.put(`${this.BASE}${this.CARD}/${card._id}`, card)
      .map((res) => res.json())
      .catch((err) => Observable.throw(err.json()));
  }

  remove(card: Card) {
    return this.http.delete(`${this.BASE}${this.CARD}/${card._id}`)
      .map((res) => res.json())
      .catch((err) => Observable.throw(err.json()));
  }

}
