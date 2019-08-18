import { Component, OnInit } from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {AuthenticationService} from '../../services/authentication.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NewsPost, RestService} from '../../services/rest.service';

@Component({
  selector: 'app-newsfeed-createpost',
  templateUrl: './newsfeed-createpost.page.html',
  styleUrls: ['./newsfeed-createpost.page.scss'],
})
export class NewsfeedCreatepostPage implements OnInit {

  validationsForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  validationMessages = {
    title: [
      { type: 'required', message: 'Please provide a title.' },
    ]
  };


  constructor(private navCtrl: NavController, private formBuilder: FormBuilder, private restService: RestService,
              private authService: AuthenticationService, public toastController: ToastController) { }

  ngOnInit() {
    this.validationsForm = this.formBuilder.group({
      title: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      content: new FormControl('', Validators.compose([
      ])),
    });
  }

  tryCreate(value) {
    const userId = this.authService.userDetails().uid;
    const authorName = this.authService.userDetails().email;
    this.restService.createNewsPost(userId, new NewsPost({author: authorName, title: value.title, content: value.content}))
        .subscribe(post => {
          if (post.id !== undefined || null) {
            this.toastController.create()
            this.navCtrl.navigateBack('newsfeed');
            this.presentToastCreated();
          }
        });
  }

  async presentToastCreated() {
    const toast = await this.toastController.create({
      message: 'Post Created!',
      duration: 2000
    });
    toast.present();
  }

}
