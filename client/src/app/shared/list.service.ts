import { forEach } from '@angular/router/src/utils/collection';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { List } from './../list/list.model';


@Injectable()
export class ListService {

  BASE = 'http://localhost.com:3000/api';
  LIST = '/list';
  lists: Array<List> = [];

  constructor(private http: Http) { }

  get() {
    return this.http.get(`${this.BASE}${this.LIST}/`)
      .map((res) => res.json())
      .do((res) => {
        console.log('res', res);
        for (const list of res) {
          this.lists.push(new List(list));
        }
        //return this.lists;
        return res;
        
      })
      .catch((err) => Observable.throw(err));
  }

  add(list) {
    return this.http.post(`${this.BASE}${this.LIST}/`, list)
      .map((res) => res.json())
      .map((res) => {
        this.lists.push(res);
        return res;
      })
      .catch((err) => {
        console.info('Something went wrong', err);
        return Observable.throw(err.json());
      });
  }

  remove(list) {
    return this.http.delete(`${this.BASE}${this.LIST}/${list._id}`)
      .map((res) => res.json())
      .catch((err) => Observable.throw(err.json()));
  }

}
