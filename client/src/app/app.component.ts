import { Component } from '@angular/core';
import { SessionService } from "./session.service";
import { LoggedinService } from './loggedin.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ SessionService ]
})
export class AppComponent {
  title = 'app works!';
  user: any;
  formInfo = {
    username: '',
    password: ''
  };
  error: string;
  privateData: any = '';

  constructor(private session: SessionService, private loggedin: LoggedinService) {
    loggedin.getEmitter().subscribe((user) => {this.user = user});
  }

  ngOnInit() {

  }

}
