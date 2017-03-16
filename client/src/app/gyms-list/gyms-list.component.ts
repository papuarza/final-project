import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { LoggedinService } from '../loggedin.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-gyms-list',
  templateUrl: './gyms-list.component.html',
  styleUrls: ['./gyms-list.component.css']
})
export class GymsListComponent implements OnInit {
  gyms: Array<Object>;
  user: any;
  title: string = 'My first angular2-google-maps project';
  lat: number = 51.678418;
  lng: number = 7.809007;
  filter: Array<string> = [];
  filterClass: any;

  constructor(private router: Router, private loggedin: LoggedinService, private session: SessionService ) {
    loggedin.getEmitter().subscribe((user) => {console.log(user); this.user = user});
  }

  ngOnInit() {
    this.session.getListGym()
      .subscribe((gyms) => {
        this.gyms = gyms;
      });
    }

    filterGyms($event){
      $event.target.classList.toggle("selected");
      this.filterClass = $event.target.attributes.class.value;
      if(this.filterClass.includes("selected")){
        switch($event.target.innerHTML){
          case "Personal Trainer":
            this.filter.push("isPersonalTraining")
            break;
          case "TRX":
            this.filter.push("isTRX")
            break;
          case "Swimming Pool":
            this.filter.push("isPool")
            break;
          case "Crossfit":
            this.filter.push("isCrossfit")
            break;
          case "Spa":
            this.filter.push("isSpa")
            break;
          case "Wi-Fi":
            this.filter.push("isWifi")
            break;
        }
        console.log(this.filter)
      } else {
        switch($event.target.innerHTML){
          case "Personal Trainer":
            this.filter.splice(this.filter.indexOf("isPersonalTraining"),1)
            break;
          case "TRX":
            this.filter.splice(this.filter.indexOf("isTRX"),1)
            break;
          case "Swimming Pool":
            this.filter.splice(this.filter.indexOf("isPool"),1)
            break;
          case "Crossfit":
            this.filter.splice(this.filter.indexOf("isCrossfit"),1)
            break;
          case "Spa":
            this.filter.splice(this.filter.indexOf("isSpa"),1)
            break;
          case "Wi-Fi":
            this.filter.splice(this.filter.indexOf("isWifi"),1)
            break;
        }
          console.log(this.filter)
      }
      this.session.filterGyms(this.filter)
        .subscribe((gyms) => {
          this.gyms = gyms;
          console.log(this.gyms)
        });
    }
};
