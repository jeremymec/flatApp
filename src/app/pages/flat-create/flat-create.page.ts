import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {Flat, RestService} from '../../services/rest.service';
import {NgModel} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {Events, NavController} from '@ionic/angular';

@Component({
  selector: 'app-flat-create',
  templateUrl: './flat-create.page.html',
  styleUrls: ['./flat-create.page.scss'],
})
export class FlatCreatePage implements OnInit {

  // Stores the name of the flat the user enters, and the flat that is created.
  flatName: string;
  createdFlat: Flat;

  constructor(private router: Router, private authService: AuthenticationService, private restService: RestService,
              private navCtrl: NavController, public events: Events) { }

  ngOnInit() {
  }

  createButtonCallback() {
      this.restService.createUsersFlat(this.authService.userDetails().uid, new Flat({name: this.flatName})).subscribe(
      (value => {
        this.createdFlat = new Flat({name: value.name, invite: value.invite});
        this.events.publish('flat:updated', this.createdFlat);
      }));
  }

  backCallback() {
    this.navCtrl.navigateBack('/flat-list');
  }

  doneCallback() {
    this.navCtrl.navigateForward('/flat-list');
  }
}
