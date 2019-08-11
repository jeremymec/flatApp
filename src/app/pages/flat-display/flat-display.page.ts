import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-flat-display',
  templateUrl: './flat-display.page.html',
  styleUrls: ['./flat-display.page.scss'],
})
export class FlatDisplayPage implements OnInit {


  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

  }

}
