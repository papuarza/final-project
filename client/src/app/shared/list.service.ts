import { IronTrelloGenericResponse } from './interfaces/generic-response.interface';
import { SortableItem } from './interfaces/sortable-item.interface';
import { Card } from './../card/card.model';
import { CardService } from './card.service';
import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as _ from 'lodash';

import { List } from './../list/list.model';

@Injectable()
export class ListService {
  LIST_ROUTE = '/list';
  ENPOINT: string;
  lists: Array<SortableItem> = [];

  constructor(
    @Inject('BASE_ENDPOINT') private BASE,
    @Inject('API_ENDPOINT') private API,
    private cardService: CardService,
    private http: Http
  ) {
    this.ENPOINT = this.BASE + this.API;
  }

  get(): Observable<SortableItem[]> {
    return this.http.get(`${this.ENPOINT}${this.LIST_ROUTE}/`)
      .map((res) => res.json())
      .map((res) => {
        for (const list of res) {
          this.lists.push(new List(list));
        }

        this.lists = this.sortItems(this.lists);
        return this.lists;
      })
      .catch((err) => Observable.throw(err));
  }

  private getNextPosition(): number {
    if (this.lists.length !== 0) {
      const pos = _.last(this.lists).position;
      return pos + 1000;
    } else {
      return 0;
    }
  }

  private sortItems(items: Array<SortableItem>): Array<SortableItem> {
    return _.orderBy(items, ['position', 'title']);
  }

  create(list): Observable<Array<SortableItem>> {
    list.position = this.getNextPosition();

    return this.http.post(`${this.ENPOINT}${this.LIST_ROUTE}/`, list)
      .map((res) => res.json())
      .map((newList) => {
        this.lists.push(new List(newList));
        this.lists = this.sortItems(this.lists);
        return this.lists;
      })
      .catch((err) => {
        return Observable.throw(err.json());
      });
  }

  createCard(card, listId): Observable<Array<SortableItem>> {
    return this.cardService.create(card)
      .map((newCard: Card) => {
        const list = (_.find(this.lists, { _id: listId })) as List;
        return list.addCard(newCard);
      });
  }

  edit(list: SortableItem): Observable<IronTrelloGenericResponse> {
    return this.http.put(`${this.ENPOINT}${this.LIST_ROUTE}/${list._id}`, list)
      .map((res) => res.json())
      .catch((err) => Observable.throw(err.json()));
  }

  remove(list: SortableItem): Observable<IronTrelloGenericResponse> {
    return this.http.delete(`${this.ENPOINT}${this.LIST_ROUTE}/${list._id}`)
      .map((res) => res.json())
      .catch((err) => Observable.throw(err.json()));
  }

  shiftCard(sourceList, targetList, cardId) {
    const sList = _.find(this.lists, { _id: sourceList }) as List;
    const tList = _.find(this.lists, { _id: targetList }) as List;

    console.log('sList', sList);
    console.log('tList', tList);

    const _index = _.findIndex(tList.cards, { _id: cardId });
    const _el = _.find(tList.cards, { _id: cardId }) as Card;

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

    tList.cards = this.sortItems(tList.cards) as Card[];
  }

  shiftList(listId) {
    const _index = _.findIndex(this.lists, { _id: listId });
    const _el = _.find(this.lists, { _id: listId }) as List;

    if (_index !== -1) {
      if (_index === 0) {
        if (this.lists.length > 1) {
          _el.position = this.lists[1].position - 1000;
        } else {
          _el.position = 0;
        }
      } else {
        if (this.lists[_index - 1] && this.lists[_index + 1]) {
          _el.position = (this.lists[_index - 1].position + this.lists[_index + 1].position) / 2;
        } else {
          _el.position = this.lists[_index - 1].position + 1000;
        }
      }

      const subscription = this.edit(_el).subscribe(
        (res) => console.log('Update list position', res),
        (err) => console.log('Update list error', err)
      );
    }
  }
}
