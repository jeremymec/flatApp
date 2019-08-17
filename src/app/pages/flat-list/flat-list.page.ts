import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Flat, RestService, User} from '../../services/rest.service';
import {AuthenticationService} from '../../services/authentication.service';
import {NavController} from '@ionic/angular';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-flat-list',
  templateUrl: './flat-list.page.html',
  styleUrls: ['./flat-list.page.scss'],
})
export class FlatListPage implements OnInit {

  private flat = undefined;
  private userId: string;

  constructor(private restService: RestService, private authService: AuthenticationService, private navCtrl: NavController,
              private changeDetectorRef: ChangeDetectorRef) {

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

}
