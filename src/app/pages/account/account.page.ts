import { Component, OnInit } from '@angular/core';
import {RestService, User} from '../../services/rest.service';
import {AuthenticationService} from '../../services/authentication.service';
import {formatNumber} from '@angular/common';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  loggedInUser = new User();

  constructor(private restService: RestService, private authService: AuthenticationService, private navCtrl: NavController) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.updateModel();
  }

  updateModel() {
    const userId = this.authService.userDetails().uid;
    this.restService.getUserById(userId).subscribe(user => {
      this.loggedInUser = user;
    });
  }

  logoutCallback() {
    this.authService.logoutUser().then(
        result => {
          this.navCtrl.navigateRoot('login');  }
    );
  }

}
