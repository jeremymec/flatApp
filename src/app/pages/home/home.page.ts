import { Component } from '@angular/core';
import {ActionSheetController, AlertController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private actionSheet: ActionSheetController, private alertController: AlertController) {
  }

  async presentActionSheet() {

    const actionSheet = await this.actionSheet.create({
      header: 'Test Action Sheet',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'trash',
          handler: () => {
            console.log('OW! You deleted me!');
          }},
        {
          text: 'Hello',
          role: 'destructive',
          icon: 'add',
          handler: () => {
            console.log('Yay! You added me!');
          }
        }]
    });
    await actionSheet.present();
  }


  async presentAlert() {
    const alert = await this.alertController.create(
        {
          header: 'Alert',
          subHeader: 'Sub Alert',
          message: 'This is the alert message!',
          buttons: ['OK']
        }
    );

    await alert.present();
  }

}
