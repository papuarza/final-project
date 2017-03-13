import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SessionService } from "./session.service";
import { AutocompleteService } from "./autocomplete.service";
import { LoggedinService } from './loggedin.service';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { GymComponent } from './gym/gym.component';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { SignupUserComponent } from './signup-user/signup-user.component';
import { SignupGymComponent } from './signup-gym/signup-gym.component';
import { LoginGymComponent } from './login-gym/login-gym.component';
import { EditGymComponent } from './edit-gym/edit-gym.component';
import { GymsListComponent } from './gyms-list/gyms-list.component';
import { GymsSingleComponent } from './gyms-single/gyms-single.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {ModalModule} from "ngx-modal";
import { HomeComponent } from './home/home.component';
import { AgmCoreModule } from 'angular2-google-maps/core';
import {GooglePlaceModule} from 'ng2-google-place-autocomplete';
import { SebmGoogleMap } from 'angular2-google-maps/core';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'gyms-list', component: GymsListComponent },
  { path: 'gyms-list/:id', component : GymsSingleComponent},
  { path: 'user', component: UserComponent,
    children: [
      { path: 'login', component:LoginUserComponent },
      { path: 'signup', component: SignupUserComponent },
      { path: ':id/edit', component: EditUserComponent },
      { path: ':id)', component: UserProfileComponent }
    ]
  },
  { path: 'gym', component: GymComponent,
  children: [
    { path: 'login', component:LoginGymComponent },
    { path: 'signup', component: SignupGymComponent },
    { path: 'edit/:id', component: EditGymComponent },
    { path: ':id)', component: GymComponent }
  ]
}
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    GymComponent,
    EditUserComponent,
    LoginUserComponent,
    SignupUserComponent,
    SignupGymComponent,
    LoginGymComponent,
    EditGymComponent,
    GymsListComponent,
    GymsSingleComponent,
    UserProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    GooglePlaceModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    ModalModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB9YL8ag7TpXztWGm7Y_s5O_3DnmX6Sfh4'
    })
  ],
  providers: [ SessionService, LoggedinService, AutocompleteService ],
  bootstrap: [AppComponent],
})
export class AppModule { }
