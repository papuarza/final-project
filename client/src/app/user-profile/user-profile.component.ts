import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { LoggedinService } from '../loggedin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any;
  gymsSaved: Array<any>;
  gymsUsed: Array<any>;
  gymsRated: Array<any>;

  constructor(private router: Router,private loggedin: LoggedinService, private session: SessionService ) {
    this.user = loggedin.getUser();
  }

  ngOnInit() {
    this.session.getGymRelated(this.user._id)
      .subscribe((gyms) => {
        this.gymsSaved = gyms.savedGyms;
        this.gymsUsed = gyms.usedGyms;
        this.gymsRated = gyms.ratedGyms;
        console.log(this.gymsSaved)
      });
  }

}
