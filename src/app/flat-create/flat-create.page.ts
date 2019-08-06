import { Component, OnInit } from '@angular/core';
import {FlatService} from '../services/flat.service';

@Component({
  selector: 'app-flat-create',
  templateUrl: './flat-create.page.html',
  styleUrls: ['./flat-create.page.scss'],
})
export class FlatCreatePage implements OnInit {

  flats: any;
  flatName: string;

  constructor(private flatService: FlatService) { }

  ngOnInit() {
    this.flatService.read_Flats().subscribe(data => {

      this.flats = data.map(e => {

        return {
          id: e.payload.doc.id,
          Name: e.payload.doc.data()['Name']
        };

      })

    })
  }

}
