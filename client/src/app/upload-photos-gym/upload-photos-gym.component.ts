import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { SessionService } from '../session.service';
import { LoggedinService } from '../loggedin.service';
import { Router} from '@angular/router';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from 'angular2-google-maps/core';

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';


@Component({
  selector: 'app-upload-photos-gym',
  templateUrl: './upload-photos-gym.component.html',
  styleUrls: ['./upload-photos-gym.component.css']
})
export class UploadPhotosGymComponent implements OnInit {
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
  gym:any;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  constructor(private router: Router,private loggedin: LoggedinService, private session: SessionService) {
    this.gym = loggedin.getUser();
  }

  ngOnInit() {

  }
}
