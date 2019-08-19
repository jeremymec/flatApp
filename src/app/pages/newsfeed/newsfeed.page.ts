import { Component, OnInit } from '@angular/core';
import {NewsPost, RestService} from '../../services/rest.service';
import {NavController} from '@ionic/angular';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.page.html',
  styleUrls: ['./newsfeed.page.scss'],
})
export class NewsfeedPage implements OnInit {

    // A list of NewsPosts updated by the model
    private newsPosts: NewsPost[];

  constructor(private navCtrl: NavController, private restService: RestService, private authSercice: AuthenticationService) { }

  ngOnInit() {
  }

    ionViewWillEnter() {
        this.updateModel();
    }

  updateModel() {
      const userId = this.authSercice.userDetails().uid;
      this.restService.getNewsPostsByUserId(userId).subscribe(posts => this.newsPosts = posts);
  }

  createPostCallback() {
      this.navCtrl.navigateForward('newsfeed-createpost');
  }


}
