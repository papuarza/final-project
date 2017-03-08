import { Component, OnInit, EventEmitter } from '@angular/core';
import { SessionService } from '../session.service';
import { LoggedinService } from '../loggedin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-gym-root',
  templateUrl: './login-gym.component.html',
  styleUrls: ['./login-gym.component.css'],
  providers: [ SessionService ]
})
export class LoginGymComponent implements OnInit {
  gym: any;
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

  loginGym() {
      this.session.login(this.formInfo)
        .subscribe(
          (gym) => this.successCb(gym),
          (err) => this.errorCb(err)
        );
    }

  errorCb(err) {
    this.error = err;
    this.gym = null;
  }

  successCb(gym) {
    this.gym = gym;
    this.error = null;
    this.loggedin.checkLogged(gym);
    this.router.navigate(['gym'])
  }
}
