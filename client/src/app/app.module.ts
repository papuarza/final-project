import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SessionService } from "./session.service";
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

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'gyms-list', component: GymsListComponent },
  { path: 'gyms-list/:id', component : GymsSingleComponent},
  { path: 'user', component: UserComponent,
    children: [
      { path: 'login', component:LoginUserComponent },
      { path: 'signup', component: SignupUserComponent },
      { path: 'edit/:id', component: EditUserComponent },
      { path: 'view/:id)', component: UserComponent }
    ]
  },
  { path: 'gym', component: GymComponent,
  children: [
    { path: 'login', component:LoginGymComponent },
    { path: 'signup', component: SignupGymComponent },
    { path: 'edit/:id', component: EditGymComponent },
    { path: 'view/:id)', component: GymComponent }
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
    GymsSingleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ SessionService, LoggedinService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
