import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * A class for a User, used by the database service and the application.
 * uid - The firebase uid code
 * name - the users name, which in the context of this app is the email
 * flat_id (optional) - the ID of the users flat
 */
export class User {
    // tslint:disable-next-line:variable-name
  uid: number;
  name: string;
    // tslint:disable-next-line:variable-name
  flat_id?: number;

  // tslint:disable-next-line:ban-types
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}

/**
 * A class for a Flat, used by the database service and the application.
 * id - The flat ID in the rails DB
 * name - the flats name
 * invite - flat invite code
 */
export class Flat {
    id?: number;
    name: string;
    invite: string;

    // tslint:disable-next-line:ban-types
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

/**
 * A class for a TodoItem, used by the database service and the application.
 * id - The todoItem ID in the rails DB
 * content - the items content
 * selected - if the item is selected
 */
export class TodoItem {
    id: number;
    content: string;
    selected?: boolean;

    // tslint:disable-next-line:ban-types
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

/**
 * A class for a NewsPost, used by the database service and the application.
 * id - The post ID in the rails DB
 * author - which user wrote the post (email)
 * title - the title of the post
 * content - the items content
 * created_at - when the post was created
 */
export class NewsPost {
    id: number;
    author: string;
    title: string;
    content: string;
    // tslint:disable-next-line:variable-name
    created_at: string;

    // tslint:disable-next-line:ban-types
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

@Injectable({
  providedIn: 'root'
})

/**
 * This is the largest service in the application - the one that interacts with the rails database.
 * These methods correspond to restful actions on a database accessed through the angular http service.
 * Changing the baseUrl will change the IP all these actions connect to.
 */
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

  public getUserById(userId: string) {
    return this.httpClient
        .get(this.baseUrl + '/users/' + userId)
        .pipe(
            map(response => {
              return new User(response);
            }));
  }

  public createUser(user: User) {
    console.log('Request caught, user with ' + user + user.name + ' and ' + user.uid);

    return this.httpClient
        .post<User>(this.baseUrl + '/users', user)
        .pipe(
            map(response => {
              console.log('response is:' + response);
              return new User(response);
            })
        ).subscribe();
  }

  public updateUser(user: User) {
      console.log('Request caught, user with ' + user.flat_id);
      return this.httpClient
        .patch(this.baseUrl + '/users/' + user.uid, {flat_id: 'nil'})
        .pipe(
            map(response => {
                console.log(response);
                return new User(response);
            })
        );
  }

  public deleteUserById(userId: number) {
    return this.httpClient
        .delete(this.baseUrl + '/users/' + userId);
  }

  public getUsersFlat(userId: string) {
        return this.httpClient
            .get<Flat>(this.baseUrl + '/users/' + userId + '/flats')
            .pipe(
                map(response  => {
                    return new Flat(response);
                }));
    }

    public createUsersFlat(userId: string, flat: Flat) {
      console.log(flat);
      return this.httpClient
            .post<Flat>(this.baseUrl + '/users/' + userId + '/flats', flat)
            .pipe(
                map(response => {
                    console.log('response is:' + response.name);
                    return response;
                })
            );
    }

    public updateUsersFlat(userId: string, flat: Flat) {
        return this.httpClient
            .patch(this.baseUrl + '/users/' + userId + '/flats', flat)
            .pipe(
                map(response => {
                    console.log(response);
                    return new Flat(response);
                })
            );
    }

    public getFlatIdByInviteCode(inviteCode: string, userId: string) {
      return this.httpClient.get(this.baseUrl + '/flats/' + inviteCode).pipe(
          map(response => {
              return new Flat(response);
          }));
    }

    public joinFlatById(flatId: number, userId: string) {
      return this.httpClient
            .patch(this.baseUrl + '/users/' + userId, {flat_id: flatId})
            .pipe(
                map(response => {
                    console.log('Response is ' + response);
                    return new User(response);
                })
            );
    }

    public getTodosByUserId(userId: string): Observable<TodoItem[]> {
      return this.httpClient.get<TodoItem[]>(this.baseUrl + '/users/' + userId + '/flats/todos/todo_items').pipe(
          map(responses => {
              return responses.map((response) => {
                  console.log('Todo list resp: ' + response.content);
                  return new TodoItem(response);
              });
          })
      );
    }

    public createTodoItem(userId: string, item: TodoItem) {
        return this.httpClient
            .post<TodoItem>(this.baseUrl + '/users/' + userId + '/flats/todos/todo_items', item)
            .pipe(
                map(response => {
                    console.log('response is:' + response);
                    return response;
                })
            );
    }

    public removeTodoItem(userId: string, todoItemId: number) {
      console.log('REMOVING TODO ITEM: ' + todoItemId);
      return this.httpClient
            .delete(this.baseUrl + '/users/' + userId + '/flats/todos/todo_items/' + todoItemId)
            .pipe(
                map(response => {
                    console.log('response is:' + response.toString());
                    return response;
                })
            );
    }

    public getNewsPostsByUserId(userId: string): Observable<NewsPost[]> {
        return this.httpClient.get<NewsPost[]>(this.baseUrl + '/users/' + userId + '/flats/news/news_posts').pipe(
            map(responses => {
                return responses.map((response) => {
                    console.log('Todo list resp: ' + response.content);
                    return new NewsPost(response);
                });
            })
        );
    }

    public createNewsPost(userId: string, post: NewsPost) {
        return this.httpClient
            .post<TodoItem>(this.baseUrl + '/users/' + userId + '/flats/news/news_posts', post)
            .pipe(
                map(response => {
                    console.log('response is:' + response);
                    return response;
                })
            );
    }

}
