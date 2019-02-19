import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { AppUser } from './models/app-user';
import { ObservableInput, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db : AngularFireDatabase) {
   }
   //we are going to use this service to save user in app.component.ts file when they log in
   //so it seems that we are saving even the same user more than one time.currently in this app 
   //we don't register a user noh we use 3rd party auth provider.so in this scenario its ok.
   save(user : firebase.User){
    this.db.object('/users/'+user.uid).update({
      name : user.displayName,
      email : user.email
    })
   }

   //defining a get method to get user object when a predefined uid being given

   get(uid : string): AngularFireObject<AppUser> {
      
      return this.db.object('/users/'+uid);
   }
}
