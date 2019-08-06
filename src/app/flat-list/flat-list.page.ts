import { Component, OnInit } from '@angular/core';
import {Flat, FlatService} from '../services/flat.service';
import {FirebaseListObservable} from '@angular/fire/database-deprecated';

@Component({
  selector: 'app-flat-list',
  templateUrl: './flat-list.page.html',
  styleUrls: ['./flat-list.page.scss'],
})
export class FlatListPage implements OnInit {

  private flats: FirebaseListObservable<Flat[]>

  constructor(private flatService: FlatService) { }

  ngOnInit() {
    this.flats = this.flatService.getFlats();
  }

}
