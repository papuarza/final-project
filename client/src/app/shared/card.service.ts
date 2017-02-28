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

  create(card) {
    return this.http.post(`${this.BASE}${this.CARD}/`, card)
      .map((res) => res.json())
      .map((newCard) => new Card(newCard))
      .catch((err) => Observable.throw(err.json()));
  }

  edit(card: Card) {
    return this.http.put(`${this.BASE}${this.CARD}/${card._id}`, card)
      .map((res) => res.json())
      .catch((err) => Observable.throw(err.json()));
  }

  transfer(card: Card, from, to) {
    const body = {
      card,
      from,
      to
    };

    return this.http.put(`${this.BASE}${this.CARD}/${card._id}/transfer`, body)
      .map((res) => res.json())
      .catch((err) => Observable.throw(err.json()));
  }

  remove(card: Card) {
    return this.http.delete(`${this.BASE}${this.CARD}/${card._id}`)
      .map((res) => res.json())
      .catch((err) => Observable.throw(err.json()));
  }

}
