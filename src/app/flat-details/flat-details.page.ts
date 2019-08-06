import { Component, OnInit } from '@angular/core';
import {FirebaseListObservable} from '@angular/fire/database-deprecated';
import {Flat, FlatService} from '../services/flat.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-flat-details',
  templateUrl: './flat-details.page.html',
  styleUrls: ['./flat-details.page.scss'],
})
export class FlatDetailsPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private flatService: FlatService) { }

  flat;

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.flatService.getFlat(id).subscribe(flat => {
        this.flat = flat;
      });
    }
  }

}
