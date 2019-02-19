import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from './auth.service';
import { Router, RouterStateSnapshot} from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate{
  path: import("@angular/router").ActivatedRouteSnapshot[];
  route: import("@angular/router").ActivatedRouteSnapshot;


  constructor(private auth:AuthService,private router: Router) { 

  }

  canActivate(route,state :RouterStateSnapshot){ 
    //in this method we can return Observable<boolean>,Promise<boolean>,boolean
    //so we use map() to transform this user Observable<firebase.user> to Observable<boolean>
    return this.auth.user$.pipe(map(user =>{
      if (user) return true;// checks if a user is logged in then navigate to the clicked url is proceeded

      this.router.navigate(['/login'],{queryParams:{returnUrl : state.url}});//here we trying to pass the current route of the user so we can ridirect 
      //the user after logging in.
      return false;
      //here user has not been logged in so it will ridirect to the login page when you delcare this service in 
      //app.module.ts a routing arrays url patterns that you need guarding.
    }));
  }
}
