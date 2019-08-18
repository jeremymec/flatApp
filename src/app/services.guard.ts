import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {RestService} from './services/rest.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user: firebase.User) => {
        if (user) {
          resolve(true);
        } else {
          console.log('User is not logged in');
          this.router.navigate(['/login']);
          resolve(false);
        }
      });
    });
  }
}

export class FlatGuard implements CanActivate {
  constructor(private router: Router, private restService: RestService) {}
  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      const userId = firebase.auth().currentUser.uid;
      this.restService.getUsersFlat(userId).subscribe(flat => {
        console.log(flat.id);
        if (flat.id !== undefined) { resolve(true ); } else { resolve(false); }
      });
    });
  }
}
