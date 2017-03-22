import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { ActivatedRoute } from '@angular/router';
import { LoggedinService } from '../loggedin.service';
import { Router } from '@angular/router';

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
    password: '',
    name: '',
    lastName: '',
    city: '',
    country: '',
    email: ''
  };
  error: string;

  constructor(private session: SessionService, private router: Router, private loggedin: LoggedinService) { }

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
    console.log(this.error)
    this.user = null;
  }

  successCb(user) {
    this.user = user;
    this.error = null;
    this.loggedin.checkLogged(user);
    this.router.navigate(['user/'+this.user._id])
  }
}
