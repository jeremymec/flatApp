import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FlatService {

  constructor(
      private firestore: AngularFirestore
  ) { }


  create_NewFlat(record) {
    return this.firestore.collection('Flats').add(record);
  }

  read_Flats() {
    return this.firestore.collection('Flats').snapshotChanges();
  }

  update_Student(recordId, record) {
    this.firestore.doc('Flats/' + recordId).update(record);
  }

  delete_Student(recordId) {
    this.firestore.doc('Students/' + recordId).delete();
  }
}
