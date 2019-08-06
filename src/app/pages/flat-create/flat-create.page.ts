import { Component, OnInit } from '@angular/core';
import {Flat, FlatService} from '../../services/flat.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-flat-create',
  templateUrl: './flat-create.page.html',
  styleUrls: ['./flat-create.page.scss'],
})
export class FlatCreatePage implements OnInit {

  flat: Flat = {
    name: ''
  };

  constructor(private router: Router, private flatService: FlatService) { }

  ngOnInit() {
  }

  createFlat() {
    this.flatService.addFlat(this.flat).then(() => {
      this.router.navigateByUrl('/');
    })
  }

}
