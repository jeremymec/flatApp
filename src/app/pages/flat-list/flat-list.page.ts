import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Flat, FlatService} from '../../services/flat.service';

@Component({
  selector: 'app-flat-list',
  templateUrl: './flat-list.page.html',
  styleUrls: ['./flat-list.page.scss'],
})
export class FlatListPage implements OnInit {

  private flats: Observable<Flat[]>;

  constructor(private flatService: FlatService) { }

  ngOnInit() {
    this.flats = this.flatService.getFlats()
  }

}
