import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Flat, FlatService} from '../../services/flat.service';

@Component({
  selector: 'app-flat-display',
  templateUrl: './flat-display.page.html',
  styleUrls: ['./flat-display.page.scss'],
})
export class FlatDisplayPage implements OnInit {

  flat: Flat = {
    name: ''
  };

  constructor(private activatedRoute: ActivatedRoute, private flatService: FlatService) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.flatService.getFlat(id);
  }

}
