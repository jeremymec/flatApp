import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validationsForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  /**
   * The messages displayed when the user does not fulfill the validations requirements.
   */
  validationMessages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  constructor(
      private navCtrl: NavController,
      private authService: AuthenticationService,
      private formBuilder: FormBuilder
  ) { }

  /**
   * Called when the user submits the form, attempts to register the user with the details provided.
   * @param value The value of the form items
   */
  tryRegister(value) {
    this.authService.registerUser(value)
        .then(res => {
          console.log(res);
          this.errorMessage = '';
          this.successMessage = 'Your account has been created. Please log in.';
        }, err => {
          console.log(err);
          this.errorMessage = err.message;
          this.successMessage = '';
        });
  }

  goLoginPage() {
    this.navCtrl.navigateBack('');
  }

  /**
   * This method sets up the form with the correct validators.
   */
  ngOnInit() {
    this.validationsForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

}
