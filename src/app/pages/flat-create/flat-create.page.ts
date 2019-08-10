import { Component, OnInit } from '@angular/core';
import {Flat, FlatService} from '../../services/flat.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-flat-create',
  templateUrl: './flat-create.page.html',
  styleUrls: ['./flat-create.page.scss'],
})
export class FlatCreatePage implements OnInit {

  flat: Flat = {
    name: ''
  };

  constructor(private router: Router, private flatService: FlatService, private authService: AuthenticationService) { }

  ngOnInit() {
  }

  createFlat() {
    this.flatService.addFlat(this.flat).then((docRef) => {
      const userId = this.authService.userDetails().uid;
      this.flatService.joinFlat(docRef.id, userId);
      this.router.navigateByUrl('/flat-list');
    });
  }

}
