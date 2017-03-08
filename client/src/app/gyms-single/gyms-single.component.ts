import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '../session.service';
import { LoggedinService } from '../loggedin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gyms-single',
  templateUrl: './gyms-single.component.html',
  styleUrls: ['./gyms-single.component.css']
})
export class GymsSingleComponent implements OnInit {
  gymId: String;
  user: any;
  singleGym: any;
  error: any;
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
      this.singleGym = singleGym});
    }

  buyPass() {
      this.session.buyPass(this.user._id, this.singleGym._id)
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
