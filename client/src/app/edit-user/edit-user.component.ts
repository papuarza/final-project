import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { LoggedinService } from '../loggedin.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user:any;
  error: any;
  formInfo = {
    username: '',
    name: '',
    lastName: '',
    city: '',
    country: '',
    email: ''
  };

  constructor(private router: Router,private loggedin: LoggedinService, private session: SessionService, ) {
    this.user = loggedin.getUser();
  }

  ngOnInit() {
    this.session.isLoggedIn()
     .subscribe(
       (user) => this.successCb(user)
     );

  }

  editUser() {
    this.session.editUser(this.formInfo, this.user._id)
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
    this.formInfo.username = this.user.username;
    this.formInfo.name = this.user.name;
    this.formInfo.lastName = this.user.lastName;
    this.formInfo.city = this.user.city;
    this.formInfo.country = this.user.country;
    this.formInfo.email = this.user.email;
    this.loggedin.checkLogged(user);
    this.error = null;
  }

}
