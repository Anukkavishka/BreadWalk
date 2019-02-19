import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
//import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import { map, switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$ :Observable<firebase.User>;

  constructor(private afAuth : AngularFireAuth, private route: ActivatedRoute,private userService:UserService) { 

    this.user$=afAuth.authState;
  }

  logIn(){
    let returnUrl =this.route.snapshot.queryParamMap.get('returnUrl') || '/';//getting the value of the current router of the user before 
    //sending the req to googleauth services.
    //now storing the url in the local storage
    localStorage.setItem('returnUrl',returnUrl);
    
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());

  }

  logOut(){

    this.afAuth.auth.signOut();
  }

  get appUser$() : Observable<AppUser>{

    return this.user$.pipe(
      switchMap(user  => {
        if(user) return this.userService.get(user.uid).valueChanges()
        
        return new Observable<any>(null);
      }
        ));

  }
}


