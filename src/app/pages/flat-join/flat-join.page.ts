import { Component, OnInit } from '@angular/core';
import {RestService} from '../../services/rest.service';
import {AuthenticationService} from '../../services/authentication.service';
import {Events, NavController} from '@ionic/angular';

@Component({
  selector: 'app-flat-join',
  templateUrl: './flat-join.page.html',
  styleUrls: ['./flat-join.page.scss'],
})
export class FlatJoinPage implements OnInit {

  private flatCode = '';
  private result: boolean;

  constructor(private restService: RestService, private authService: AuthenticationService, private navController: NavController,
              private events: Events) { }

  ngOnInit() {
  }

  joinCallback() {
    this.restService.getFlatIdByInviteCode(this.flatCode, this.authService.userDetails().uid).subscribe(
        flat => this.restService.joinFlatById(flat.id, this.authService.userDetails().uid).subscribe(
            user => this.result = (user.flat_id !== 0)));
  }

  backCallback() {
    this.navController.navigateRoot('flat-list');
  }

}
