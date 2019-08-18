import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import * as firebase from 'firebase';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule, FirestoreSettingsToken} from '@angular/fire/firestore';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {AuthGuard, FlatGuard} from './services.guard';

firebase.initializeApp(environment.firebase);
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
            IonicModule.forRoot(),
            AppRoutingModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule,
      AngularFireAuthModule,
      HttpClientModule
            ],
  providers: [
    StatusBar,
    SplashScreen,
      SocialSharing,
      AuthGuard,
      FlatGuard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
