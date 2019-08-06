import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Flat {
  id?: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class FlatService {
  private flats: Observable<Flat[]>;
  private flatCollection: AngularFirestoreCollection<Flat>;

  constructor(private afs: AngularFirestore) {
    this.flatCollection = this.afs.collection<Flat>('flats');
    this.flats = this.flatCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
    );
  }

  getFlats(): Observable<Flat[]> {
    return this.flats;
  }

  getFlat(id: string): Observable<Flat> {
    return this.flatCollection.doc<Flat>(id).valueChanges().pipe(
        take(1),
        map(flat => {
          flat.id = id;
          return flat;
        })
    );
  }

  addFlat(flat: Flat): Promise<DocumentReference> {
    return this.flatCollection.add(flat);
  }

  updateIdea(flat: Flat): Promise<void> {
    return this.flatCollection.doc(flat.id).update({ name: flat.name});
  }

  deleteFlat(id: string): Promise<void> {
    return this.flatCollection.doc(id).delete();
  }
}
