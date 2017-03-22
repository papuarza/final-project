import { Component, OnInit, ViewChildren } from '@angular/core';
import { SessionService } from '../session.service';
import { LoggedinService } from '../loggedin.service';
import { Router} from '@angular/router';
import {Modal} from '../../components/ng2-modal/modal';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: any;
  user2:any;
  gymsSaved: Array<any> = [];
  gymsUsed: Array<any> = [];
  gymsRated: Array<any> = [];
  comments: any;
  stars: Array<Number> = [1,2,3,4,5];

  constructor(private router: Router,private loggedin: LoggedinService, private session: SessionService, ) {
    this.user = loggedin.getUser();
  }

  ngOnInit() {
    // this.loggedin.getEmitter().subscribe((user) => {
      // console.log(this.user);
      // this.user = user;
      this.session.getGymRelated(this.user._id)
        .subscribe((gyms) => {
          console.log(gyms)
          this.gymsSaved = gyms.savedGyms;
          this.gymsUsed = gyms.usedGyms;
          this.gymsRated = gyms.ratedGyms;
          console.log(gyms);
        });
        this.session.getCommentsRelatedUser(this.user._id)
          .subscribe((listedComments) => {
            this.comments = listedComments;
            console.log(this.comments)
          });
    // });
  }
}
