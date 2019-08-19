import { Component, OnInit } from '@angular/core';
import {RestService} from '../../services/rest.service';
import {AuthenticationService} from '../../services/authentication.service';
import {Events, NavController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-flat-join',
  templateUrl: './flat-join.page.html',
  styleUrls: ['./flat-join.page.scss'],
})
export class FlatJoinPage implements OnInit {

  private flatCode = '';
  private result: boolean;

  constructor(private restService: RestService, private authService: AuthenticationService, private navController: NavController,
              private events: Events, public toastController: ToastController) { }

  ngOnInit() {
  }

  /**
   * Called by the join button.
   * Uses the rest service to attempt to get a flat by the invite code, and if the flat is valid, joins the flat.
   * Displays appropriate prompts on success / failure.
   */
  joinCallback() {
    this.restService.getFlatIdByInviteCode(this.flatCode, this.authService.userDetails().uid).subscribe(
        flat => this.restService.joinFlatById(flat.id, this.authService.userDetails().uid).subscribe(
            user => {
              console.log(user.flat_id);
              if (user.flat_id === null || user.flat_id === 0) {
                this.presentToastFaliure();
              } else {
                this.presentToastSuccess();
                this.navController.navigateRoot('flat-list');
              }
            }));
  }

  backCallback() {
    this.navController.navigateRoot('flat-list');
  }

  async presentToastSuccess() {
    const toast = await this.toastController.create({
      message: 'Joined Flat!',
      duration: 2000
    });
    toast.present();
  }

  async presentToastFaliure() {
    const toast = await this.toastController.create({
      message: 'Join Failed, Invalid Invite Code',
      duration: 2000
    });
    toast.present();
  }

}
