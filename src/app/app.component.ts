import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  navigate: any;

    /**
     * The default ionic constructor for AppComponent, call on App init.
     * This also creates the side menu before doing normal tasks.
     */
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.sideMenu();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

    /**
     * Any changes to the side menu should be made to the array inside this function.
     */
  sideMenu() {
    this.navigate =
        [
          {
            title : 'Flat',
            url   : '/flat-list',
            icon  : 'home'
          },
          {
            title : 'To-do List',
            url   : '/todo-view',
            icon  : 'checkbox'
          },
          {
            title : 'Newsfeed',
            url   : '/newsfeed',
            icon  : 'paper'
          },
            {
                title : 'Account',
                url   : '/account',
                icon  : 'finger-print'
            },
        ];
  }
}
