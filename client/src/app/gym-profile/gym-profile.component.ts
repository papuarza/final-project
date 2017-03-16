import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '../session.service';
import { LoggedinService } from '../loggedin.service';
import { Router } from '@angular/router';
import { SebmGoogleMap } from 'angular2-google-maps/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-gym-profile',
  templateUrl: './gym-profile.component.html',
  styleUrls: ['./gym-profile.component.css']
})
export class GymProfileComponent implements OnInit {
  public uploader:FileUploader = new FileUploader({url: 'http://localhost:3000/auth/gyms/upload-photo'});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
  gymId: String;
  feedback: string;
  gym: any;
  singleGym: any;
  error: any;
  title: string = 'My first angular2-google-maps project';
  lat: number;
  lng: number;
  zoom: number = 10;
  usersSaved: any;
  usersUsed: any;
  comments: any;
  stars: Array<Number> = [1,2,3,4,5];
  constructor(private router: Router, private route: ActivatedRoute,private loggedin: LoggedinService, private session: SessionService ) {
    this.gym = loggedin.getGym();
  }

ngOnInit() {
  // this.loggedin.getEmitter().subscribe((gym) => {
  //   this.gym = gym
    this.session.getUserRelated(this.gym._id)
      .subscribe((users) => {
        this.usersSaved = users.savedUsers;
        this.usersUsed = users.usedUsers;
      });
      this.session.getCommentsRelated(this.gym._id)
        .subscribe((listedComments) => {
          this.comments = listedComments;
      });
  // });
}

errorCb(err) {

}

successCb(gym) {

}

upload(){
  this.uploader.uploadAll();
}

changeUserStatus(userId) {
  this.session.changeUserStatus(this.gym._id, userId)
  .subscribe((users) => {
    this.usersSaved = users.savedUsers;
    this.usersUsed = users.usedUsers;
    console.log(this.usersSaved, this.usersUsed)
  });
  }
}
