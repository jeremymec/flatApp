import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {Flat, RestService} from '../../services/rest.service';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-flat-create',
  templateUrl: './flat-create.page.html',
  styleUrls: ['./flat-create.page.scss'],
})
export class FlatCreatePage implements OnInit {

  flatName: string;
  createdFlat: Flat;

  constructor(private router: Router, private authService: AuthenticationService, private restService: RestService) { }

  ngOnInit() {
  }

  createButtonCallback() {
      this.restService.createUsersFlat(this.authService.userDetails().uid, new Flat({name: this.flatName})).subscribe(
      (value => this.createdFlat = new Flat({name: value.name, invite: value.invite})));
  }
}
