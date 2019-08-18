import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewsfeedCreatepostPage } from './newsfeed-createpost.page';

const routes: Routes = [
  {
    path: '',
    component: NewsfeedCreatepostPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ],
  declarations: [NewsfeedCreatepostPage]
})
export class NewsfeedCreatepostPageModule {}
