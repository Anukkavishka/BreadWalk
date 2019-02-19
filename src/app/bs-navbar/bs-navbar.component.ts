import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import * as firebase from 'firebase/app';
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  appUser: AppUser;
  constructor(public auth: AuthService) {
    //reusing angularfire2auth paras to assign auth services properties. 
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
    // now we can refer this reference in the template,since we are using async pipe,otherwise 
    //because there are nexted Observables there will be infinite loop.
    //we don't need to unsubscribe from this component because its always going 
    //to be there until the user closes the app,because it's the navbar
    //since we won't have multiple instances of this component in DOM we don't need to worry.

  }

  logOut() {
    this.auth.logOut();
    this.appUser = null;

  }

}
