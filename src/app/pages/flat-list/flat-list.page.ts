import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Flat, RestService, User} from '../../services/rest.service';
import {AuthenticationService} from '../../services/authentication.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-flat-list',
  templateUrl: './flat-list.page.html',
  styleUrls: ['./flat-list.page.scss'],
})
export class FlatListPage implements OnInit {

  private flats: Flat[] = [];
  private userId: string;

  constructor(private restService: RestService, private authService: AuthenticationService, private navCtrl: NavController, ) {
    this.userId = authService.userDetails().uid;
    this.restService.getUsersFlats(this.userId).subscribe((flats: Flat[]) => {
      this.flats = flats;
    });
  }

  ngOnInit() {

  }

  createFlatCallback() {
    this.navCtrl.navigateForward('/flat-create');
  }

  joinFlatCallback() {
    console.log('Hi!');
  }

}
