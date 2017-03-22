import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '../session.service';
import { LoggedinService } from '../loggedin.service';
import { Router } from '@angular/router';
import { SebmGoogleMap } from 'angular2-google-maps/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  gymId: String;
  user: any;
  singleGym: any;
  error: any;
  formInfo = {
    comments: '',
    rate: ''
  };
  constructor(private router: Router, private route: ActivatedRoute,private loggedin: LoggedinService, private session: SessionService ) {
    this.user = loggedin.getUser();
  }

ngOnInit() {
  this.route.params
  .subscribe((params) => {
  this.gymId = params['id'];
});
  this.session.getItemGym(this.gymId)
    .subscribe((singleGym) => {
      this.singleGym = singleGym
    });
  this.loggedin.getEmitter().subscribe((user) => {this.user = user});
}

  rate() {
      this.session.rate(this.user._id, this.singleGym._id, this.formInfo)
      .subscribe(
        (gym) => this.successCb(gym),
        (err) => this.errorCb(err)
      );
      this.session.changeUserStatusRate(this.user._id, this.singleGym._id)
      .subscribe(
        (gym) => this.successCb(gym),
        (err) => this.errorCb(err)
      );
  }

errorCb(err) {
  this.error = err;
  //this.gym = null;
}

successCb(gym) {
  //this.gym = gym;
  this.error = null;
  this.router.navigate([''])
}



}
