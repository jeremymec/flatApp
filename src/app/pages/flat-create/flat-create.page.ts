import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-flat-create',
  templateUrl: './flat-create.page.html',
  styleUrls: ['./flat-create.page.scss'],
})
export class FlatCreatePage implements OnInit {

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
  }

  createFlat() {

  }

}
