import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { LoggedinService } from '../loggedin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'user-root',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [ SessionService ]
})
export class UserComponent implements OnInit {
  user: any;
  formInfo = {
    username: '',
    password: ''
  };
  error: string;
  privateData: any = '';

  constructor(private session: SessionService, private router: Router, private loggedin: LoggedinService) {
    loggedin.getEmitter().subscribe((user) => {this.user = user});
  }

  ngOnInit() {
    this.session.isLoggedIn()
     .subscribe(
       (user) => this.successCb(user)
     );
  }

  successCb(user) {
    this.user = user;
    this.loggedin.checkLogged(user);
    this.error = null;
  }
  //
  // logout() {
  //   this.session.logout()
  //     .subscribe(
  //       () => this.successCb(null),
  //       (err) => this.errorCb(err)
  //     );
  // }
  //
  // getPrivateData() {
  //   this.session.getPrivateData()
  //     .subscribe(
  //       (data) => this.privateData = data,
  //       (err) => this.error = err
  //     );
  // }
  //
  // errorCb(err) {
  //   this.error = err;
  //   this.user = null;
  // }
  //
  // successCb(user) {
  //   this.user = user;
  //   this.router.navigate([''])
  //   this.loggedin.checkLogged(null);
  //   this.error = null;
  // }
}
