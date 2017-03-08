import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { LoggedinService } from '../loggedin.service';

@Component({
  selector: 'signup-gym-root',
  templateUrl: './signup-gym.component.html',
  styleUrls: ['./signup-gym.component.css'],
  providers: [ SessionService ]
})
export class SignupGymComponent implements OnInit {
  gym: any;
  formInfo = {
    username: '',
    password: '',
    name: '',
    email: '',
    city: '',
    country: ''
  };
  error: string;

  constructor(private session: SessionService, private router: Router, private loggedin: LoggedinService) { }

  ngOnInit() {
    }

  signupGym() {
    this.session.signupGym(this.formInfo)
      .subscribe(
        (gym) => this.successCb(gym),
        (err) => this.errorCb(err)
    );
  }

  errorCb(err) {
    this.error = err;
    console.log(this.error)
    this.gym = null;
  }

  successCb(gym) {
    this.gym = gym;
    this.error = null;
    this.loggedin.checkLogged(gym);
    this.router.navigate(['gym'])
  }
}
