import { Component, OnInit, EventEmitter } from '@angular/core';
import { SessionService } from '../session.service';
import { LoggedinService } from '../loggedin.service';
import { Router } from '@angular/router';
import {ModalModule} from "ngx-modal";

@Component({
  selector: 'login-user-root',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css'],
  providers: [ SessionService ]
})
export class LoginUserComponent implements OnInit {
  user: any;
  formInfo = {
    username: '',
    password: ''
  };
  userLogged = new EventEmitter();
  error: string;
  privateData: any = '';

  constructor(private session: SessionService, private router: Router, private loggedin: LoggedinService) { }

  ngOnInit() {
    }

  login() {
      this.session.login(this.formInfo)
        .subscribe(
          (user) => this.successCb(user),
          (err) => this.errorCb(err)
        );
    }

  errorCb(err) {
    this.error = err;
    this.user = null;
  }

  successCb(user) {
    this.user = user;
    this.error = null;
    this.loggedin.checkLogged(user);
    this.router.navigate(['user/'+this.user._id])
  }
}
