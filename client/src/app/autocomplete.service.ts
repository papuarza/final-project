import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AutocompleteService {
  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  autocomplete(input) {
    return this.http.get("https://maps.googleapis.com/maps/api/place/autocomplete/js?input="+input+"&key=AIzaSyB9YL8ag7TpXztWGm7Y_s5O_3DnmX6Sfh4")
    .map(res => res.json())
    .catch(this.handleError);
  }
}
