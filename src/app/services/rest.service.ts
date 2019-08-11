import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

export class User {
  uid: number;
  name: string;

  // tslint:disable-next-line:ban-types
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}

@Injectable({
  providedIn: 'root'
})
export class RestService {

  baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {  }

  public getUsers(): Observable<User[]> {

    return this.httpClient
        .get<User[]>(this.baseUrl + '/users')
        .pipe(
        map(users  => {

          return  users.map((user) =>  new User(user));

        }));
  }

  public getUserById(userId: number) {
    return this.httpClient
        .get(this.baseUrl + '/users/' + userId)
        .pipe(
            map(response => {
              return new User(response);
            }));
  }

  public createUser(user: User): Observable<User> {
    console.log("Request caught, user with " + user.name + " and " + user.uid);

    return this.httpClient
        .post(this.baseUrl + '/users', user)
        .pipe(
            map(response => {
              console.log('response is:' + response);
              return new User(response);
            })
        );
  }

  public updateUser(user: User) {
    return this.httpClient
        .put(this.baseUrl + '/users' + user.uid, user)
        .pipe(
            map(response => {
              return new User(response);
            })
        );
  }

  public deleteUserById(userId: number) {
    return this.httpClient
        .delete(this.baseUrl + '/users/' + userId);
  }
}
