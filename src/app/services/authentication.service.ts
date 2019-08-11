import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {RestService, User} from './rest.service';
import {error} from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private restService: RestService) { }

  registerUser(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
          .then((user) => {
            this.onRegisterUser(new User({uid: user.user.uid, name: value.email}));
            resolve();
          }).catch((err) => {
        reject();
      });
    });
  }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
          .then(
              res => resolve(res),
              err => reject(err));
    });
  }

  logoutUser() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        firebase.auth().signOut()
            .then(() => {
              console.log('Log Out');
              resolve();
            }).catch((err) => {
          reject();
        });
      }
    });
  }

  onRegisterUser(user: User) {
    console.log('Create User Calling with user: ' + user);
    this.restService.createUser(user);

  }

  userDetails() {
    return firebase.auth().currentUser;
  }
}
