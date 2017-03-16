import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { SessionService } from '../session.service';
import { LoggedinService } from '../loggedin.service';
import { Router} from '@angular/router';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from 'angular2-google-maps/core';

@Component({
  selector: 'app-edit-gym',
  templateUrl: './edit-gym.component.html',
  styleUrls: ['./edit-gym.component.css']
})
export class EditGymComponent implements OnInit {
  gym:any;
  error: any;
  formInfo = {
    username: '',
    name: '',
    city: '',
    country: '',
    email: '',
    price: '',
    schedule: '',
    webPage:'',
    facebook:'',
    twitter: '',
    instagram: '',
    isWifi:'',
    isParking:'',
    isSpa:'',
    isPool:'',
    isBasketballCourt:'',
    isSoccerCourt:'',
    isTennisCourt:'',
    isPaddleCourt:'',
    isTRX:'',
    isCrossfit:'',
    isSpinning:'',
    isPersonalTraining:'',
    otherClasses:'',
    position: ''
  };

  public searchControl: FormControl;

  constructor(private router: Router,private loggedin: LoggedinService, private session: SessionService, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone ) {
    this.gym = loggedin.getUser();
  }

  ngOnInit() {
    this.session.isLoggedIn()
     .subscribe(
       (gym) => this.successCb(gym)
     );
  }

  editGym() {
    this.session.editGym(this.formInfo, this.gym._id)
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
    this.formInfo.username = this.gym.username;
    this.formInfo.name = this.gym.name;
    this.formInfo.city = this.gym.city;
    this.formInfo.country = this.gym.country;
    this.formInfo.email = this.gym.email;
    this.formInfo.price = this.gym.price;
    this.formInfo.schedule = this.gym.schedule;
    this.formInfo.webPage = this.gym.webPage;
    this.formInfo.facebook = this.gym.facebook;
    this.formInfo.twitter = this.gym.twitter;
    this.formInfo.instagram = this.gym.instagram;
    this.formInfo.isWifi = this.gym.isWifi;
    this.formInfo.isParking = this.gym.isParking;
    this.formInfo.isSpa = this.gym.isSpa;
    this.formInfo.isPool = this.gym.isPool;
    this.formInfo.isTRX = this.gym.isTRX;
    this.formInfo.isCrossfit = this.gym.isCrossfit;
    this.formInfo.isPersonalTraining = this.gym.isPersonalTraining;
    this.formInfo.isSpinning = this.gym.isSpinning;
    this.formInfo.isBasketballCourt = this.gym.isBasketballCourt;
    this.formInfo.isSoccerCourt = this.gym.isSoccerCourt;
    this.formInfo.isTennisCourt = this.gym.isTennisCourt;
    this.formInfo.isPaddleCourt = this.gym.isPaddleCourt;
    this.formInfo.otherClasses = this.gym.otherClasses;
    this.formInfo.position = this.gym.position;
    this.loggedin.checkLogged(gym);
    this.error = null;
  }

}
