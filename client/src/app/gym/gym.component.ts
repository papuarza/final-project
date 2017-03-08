import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { LoggedinService } from '../loggedin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'user-root',
  templateUrl: './gym.component.html',
  styleUrls: ['./gym.component.css'],
  providers: [ SessionService ]
})
export class GymComponent implements OnInit {
  gym: any;
  formInfo = {
    username: '',
    password: ''
  };
  error: string;
  privateData: any = '';

  constructor(private session: SessionService, private router: Router, private loggedin: LoggedinService) {
    loggedin.getEmitter().subscribe((gym) => {console.log(gym); this.gym = gym});
  }

  ngOnInit() {
  }

  logoutGym() {
    this.session.logout()
      .subscribe(
        () => this.successCb(null),
        (err) => this.errorCb(err)
      );
  }

  getPrivateData() {
    this.session.getPrivateData()
      .subscribe(
        (data) => this.privateData = data,
        (err) => this.error = err
      );
  }

  errorCb(err) {
    this.error = err;
    this.gym = null;
  }

  successCb(gym) {
    this.gym = gym;
    this.router.navigate([''])
    this.loggedin.checkLogged(null);
    this.error = null;
  }
}
