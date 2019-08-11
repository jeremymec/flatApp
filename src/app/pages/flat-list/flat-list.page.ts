import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {RestService, User} from '../../services/rest.service';

@Component({
  selector: 'app-flat-list',
  templateUrl: './flat-list.page.html',
  styleUrls: ['./flat-list.page.scss'],
})
export class FlatListPage implements OnInit {

  private users: User[] = [];

  constructor(private restService: RestService) { }

  ngOnInit() {
    this.restService.getUsers().subscribe((users: User[]) => {

      this.users = users;
    });
  }

}
