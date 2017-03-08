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

  constructor(private router: Router, private loggedin: LoggedinService, private session: SessionService ) {
    loggedin.getEmitter().subscribe((user) => {console.log(user); this.user = user});
  }

  ngOnInit() {
    this.session.getListGym()
      .subscribe((gyms) => {
        this.gyms = gyms;
      });
  }

}
