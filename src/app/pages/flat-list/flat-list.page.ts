import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Flat, RestService, TodoItem, User} from '../../services/rest.service';
import {AuthenticationService} from '../../services/authentication.service';
import {AlertController, NavController, ToastController} from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-flat-list',
  templateUrl: './flat-list.page.html',
  styleUrls: ['./flat-list.page.scss'],
})
export class FlatListPage implements OnInit {

  // Stores the flat and the currently logged in user
  private flat: Flat;
  private userId: string;

  constructor(private restService: RestService, private authService: AuthenticationService, private navCtrl: NavController,
              private changeDetectorRef: ChangeDetectorRef, private alertController: AlertController,
              private socialSharing: SocialSharing, public toastController: ToastController ) {
  }

  ngOnInit() {
      this.updateModel();
  }

  ionViewWillEnter() {
    this.updateModel();
  }

  updateModel() {
    this.userId = this.authService.userDetails().uid;
    this.restService.getUsersFlat(this.userId).subscribe((flat => flat.invite !== undefined ? this.flat = flat : this.flat = undefined));
    this.changeDetectorRef.detectChanges();
  }

  createFlatCallback() {
    this.navCtrl.navigateForward('/flat-create');
  }

  joinFlatCallback() {
    this.navCtrl.navigateForward('/flat-join');
  }

  leaveFlatCallback() {
    this.restService.updateUser(new User({uid: this.authService.userDetails().uid, flat_id: 'nil'})).subscribe(user => this.updateModel());
  }

  editNameCallback() {
    this.presentAlertCreate();
  }

  shareButtonCallback() {
    this.socialSharing.share('Your FlatAPP invite code is ' + this.flat.invite, 'Flat Invite Code');
  }

  /**
   * Presents a toast saying the name has been changed
   */
  async presentToastNameChanged() {
    const toast = await this.toastController.create({
      message: 'Name changed successfully',
      duration: 2000
    });
    toast.present();
  }

  /**
   * Presents an alert allowing the user to change the name.
   * Alert sends a method to the rest service doing this.
   */
  async presentAlertCreate() {
    const alert = await this.alertController.create({
      header: 'Edit Flat Name',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Enter a new name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Create',
          handler: data => {
            const userId = this.authService.userDetails().uid;
            this.flat.name = data.name1;
            this.restService.updateUsersFlat(userId, this.flat).subscribe((response) => {
              this.flat = response;
              this.updateModel();
            });
            this.presentToastNameChanged();
          }
        }
      ]
    });

    await alert.present();
  }

}
