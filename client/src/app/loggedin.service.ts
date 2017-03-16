import { Injectable } from '@angular/core';
import { Component, OnInit, Input, EventEmitter } from '@angular/core';

@Injectable()
export class LoggedinService {
  user: any;
  gym: any;
  userLogged = new EventEmitter();
  gymLogged = new EventEmitter();
  constructor() { }

  getEmitter(){
    return this.userLogged;
  }

  getEmitterGym(){
    return this.gymLogged;
  }

  isLoggedIn():boolean{
    return this.user != undefined ? true : false;
  }

  isLoggedInGym():boolean{
    return this.gym != undefined ? true : false;
  }

  getUser(){
    return this.user;
  }

  getGym(){
    return this.gym;
  }

  checkLogged(user) {
    this.user = user;
    this.userLogged.emit(user);
  }

  checkLoggedGym(gym) {
    this.gym = gym;
    this.gymLogged.emit(gym);
  }
}
