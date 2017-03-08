import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'signup-user-root',
  templateUrl: './signup-user.component.html',
  styleUrls: ['./signup-user.component.css'],
  providers: [ SessionService ]
})
export class SignupUserComponent implements OnInit {
  user: any;
  formInfo = {
    username: '',
    password: ''
  };
  error: string;

  constructor(private session: SessionService, private route: ActivatedRoute) { }

  ngOnInit() {
    }

  signup() {
    this.session.signup(this.formInfo)
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
  }
}
