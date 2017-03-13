import { Component } from '@angular/core';
import { SessionService } from "./session.service";
import { LoggedinService } from './loggedin.service';
import {ModalModule} from "ngx-modal";
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ SessionService ]
})
export class AppComponent {
  title = 'app works!';
  user: any;
  formInfo = {
    username: '',
    password: ''
  };
  error: string;
  handleError: any;
  privateData: any = '';
  input: any;
  searchBox: any;

  constructor(private session: SessionService,private router: Router, private loggedin: LoggedinService) {
    loggedin.getEmitter().subscribe((user) => {this.user = user});
  }

  ngOnInit() {
    this.session.isLoggedIn()
     .subscribe(
       (user) => this.successCb(user)
     );

    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  }

  logout() {
    this.session.logout()
      .subscribe(
       () => this.logOutSucess(null),
       (err) => this.errorCb(err)
     );
  }

  errorCb(err) {
    this.error = err;
    this.user = null;
  }

  successCb(user) {
    this.user = user;
    this.loggedin.checkLogged(user);
    this.error = null;
  }

  logOutSucess(user) {
    this.loggedin.checkLogged(null);
    this.router.navigate([''])
    this.user = null;
  }

}
