import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{
  path: import("@angular/router").ActivatedRouteSnapshot[];
  route: import("@angular/router").ActivatedRouteSnapshot;

  constructor(private auth:AuthService, private userService:UserService) { }

  canActivate(): Observable<boolean>{
    //pay great attention to this part. this user object is of type firebase.User,
        //so its not the type we stored in the firebaseDatabase.
        
    return this.auth.user$.pipe(
      switchMap(user  => this.userService.get(user.uid).valueChanges()
      .pipe(map(appUser => appUser.isAdmin))
      ));
      //this is the most recent updated and debugged code on this.
      //ng 7 there are new objects when you access database
      /*
      get() we defined returns a AngularFireObject<AppUser> and we need to call valueChanges() method
      on that to transform that to a ObservableInput<any> then we need to call .pipe() operator on it to 
      map()ObservableInput<> value to a boolean value.
      */
    }


}

