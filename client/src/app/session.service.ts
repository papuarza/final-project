import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment';

const baseURL = environment.apiUrl

@Injectable()
export class SessionService {
  options: Object = {withCredentials:true};
  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  signup(user) {
    return this.http.post(baseURL+`auth/user/signup`, user,{})
      .map(res => res.json())
      .catch(this.handleError);
  }

  login(user) {
    return this.http.post(baseURL+`auth/user/login`, user,this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  editUser(user, userId) {
    return this.http.post(baseURL+`auth/user/edit/`+userId, user,this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  logout() {
    return this.http.post(`${baseURL}auth/user/logout`,{},this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  isLoggedIn() {
    return this.http.get(baseURL+`auth/user/loggedin`, {withCredentials:true})
      .map(res => res.json())
      .catch((err) => this.handleError(err));
  }

  getPrivateData() {
    return this.http.get(baseURL+`auth/user/private`,{withCredentials:true})
      .map(res => res.json())
      .catch(this.handleError);
  }

//////////////////GYM//////////////////////////

  signupGym(gym) {
    return this.http.post(baseURL+`auth/gym/signup`, gym,{withCredentials:true})
      .map(res => res.json())
      .catch(this.handleError);
  }

  loginGym(gym) {
    return this.http.post(baseURL+`auth/gym/login`, gym,{withCredentials:true})
      .map(res => res.json())
      .catch(this.handleError);
  }

  logoutGym() {
    return this.http.post(baseURL+`auth/gym/logout`, {withCredentials:true})
      .map(res => res.json())
      .catch(this.handleError);
  }

  isLoggedInGym() {
    return this.http.get(baseURL+`auth/gym/loggedin`,{withCredentials:true})
      .map(res => res.json())
      .catch((err) => this.handleError(err));
  }

  editGym(gym, gymId) {
    return this.http.post(baseURL+`auth/gyms/edit/`+gymId, gym,this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getPrivateDataGym() {
    return this.http.get(baseURL+`auth/gym/private`,{withCredentials:true})
      .map(res => res.json())
      .catch(this.handleError);
  }

  getListGym() {
    return this.http.get(baseURL+`gyms/list`)
      .map((res) => res.json());
  }

  getItemGym(id) {
    return this.http.get(baseURL+`gyms/list/`+id)
      .map((res) => res.json());
  }

  ///////////////////////RELATION USER-GYM///////////////

  buyPass(userId, gymId) {
    return this.http.post(baseURL+`relation/user-gym`, {data: {userId : userId, gymId: gymId}})
      .map((res) => res.json());
  }

  rate(userId, gymId, formInfo) {
    return this.http.post(baseURL+`relation/user-gym-rate`, {data: {userId : userId, gymId: gymId, formInfo: formInfo}})
      .map((res) => res.json());
  }

  filterGyms(filters) {
    return this.http.post(baseURL+`auth/gym/filter`, filters)
      .map((res) => res.json());
  }

  getGymRelated(userId){
    return this.http.post(baseURL+`auth/user/`+userId+`/listed-gym`, userId)
      .map((res) => res.json());
  }

  getUserRelated(gymId){
    return this.http.post(baseURL+`auth/gym/`+gymId+`/listed-users`, gymId)
      .map((res) => res.json());
  }

  getCommentsRelated(gymId){
    return this.http.post(baseURL+`auth/gym/`+gymId+`/listed-comments`, gymId)
      .map((res) => res.json());
  }

  getCommentsRelatedUser(userId){
    return this.http.post(baseURL+`auth/user/`+userId+`/listed-comments`, userId)
      .map((res) => res.json());
  }

  changeUserStatus(gymId, userId){
    return this.http.post(baseURL+`auth/gym/`+gymId+`/change-user-status`, {data: {gymId: gymId, userId: userId}})
      .map((res) => res.json());
  }

  changeUserStatusRate(userId, gymId){
    return this.http.post(baseURL+`auth/user/`+userId+`/change-user-status`, {data: {gymId: gymId, userId: userId}})
      .map((res) => res.json());
  }
}
