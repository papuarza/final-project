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

  constructor(private router: Router, private loggedin: LoggedinService, private session: SessionService ) {
    loggedin.getEmitter().subscribe((user) => {console.log(user); this.user = user});
  }

  ngOnInit() {
    this.session.getListGym()
      .subscribe((gyms) => {
        this.gyms = gyms;
      });

      // GoogleMapsLoader.load(function(google) {
      //   const location = { lat: -25.363, lng: 131.044 };
      //   const map = new google.maps.Map(document.getElementById('map'), {
      //     key: "AIzaSyB9YL8ag7TpXztWGm7Y_s5O_3DnmX6Sfh4",
      //     zoom: 4,
      //     center: location,
      //     zoomControl: false,
      //     scaleControl: false,
      //     streetViewControl: false
      //   });
      //   const contentString = '<div id="content">' +
      //     '<div id="siteNotice">' +
      //     '</div>' + '<img src="https://ca.slack-edge.com/T02CQ4EN4-U3KPHFCUW-807f02da0a86-72">' +
      //     '<h2 id="event-name" class="event-name">Quedada para preguntar dudas de Java</h2>' +
      //     '<h5 id="user-name" class="user-name">JavaMaister2000</h5>' +
      //     '<div id="bodyContent">' +
      //     '<p>Lorem ipsum dolor sit amet, consectetur.</p>' +
      //     '</div>' +
      //     '</div>';
      //   const infowindow = new google.maps.InfoWindow({
      //     content: contentString,
      //     maxWidth: 200,
      //   });
      //   const image = {
      //     url: 'https://ca.slack-edge.com/T02CQ4EN4-U3KPHFCUW-807f02da0a86-72',
      //             scaledSize: new google.maps.Size(35, 35)
      //   }
      //   const marker = new google.maps.Marker({
      //     position: location,
      //     map: map,
      //     animation: google.maps.Animation.DROP,
      //     icon: image
      //   });
      //   marker.addListener('click', function() {
      //     infowindow.open(map, marker);
      //   });
      // });
    }
};
