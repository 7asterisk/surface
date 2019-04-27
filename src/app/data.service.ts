import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token',
    'Access-Control-Allow-Origin': '*',
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data = {
    title: '',
    content: ''
  };

  private i = new BehaviorSubject(0);
  main = this.i.asObservable();
  private j = new BehaviorSubject(0);
  manu = this.j.asObservable();

  private itemsCollection: AngularFirestoreCollection<any>;
  private itemDoc: AngularFirestoreDocument<any>;
  item: Observable<any>;
  feedback: Observable<any[]>;
  constructor(public db: AngularFirestore, public afs: AngularFirestore, private http: HttpClient) {
    // db.collection('xyz').valueChanges();
  }


  // phpfileuplode(file) {
  //  const httpParams = new HttpParams().set('file',file); 
  //   this.http.post('',file)
  // }


  sendMail(txt, nameV, emailV, pnoV, companyV, countryV, servicesV) {
    const body = {
      txt: txt, nameV: nameV, emailV: emailV, pnoV: pnoV, companyV: companyV, countryV: countryV, servicesV: servicesV
    };
    const url = `https://us-central1-serfacedesign.cloudfunctions.net/sendMail`;
    const headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })};

    return this.http.post(url, body, headers)
      .toPromise()
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  setmain(main) {
    this.i.next(main);
  }
  getmain(): Observable<any> {
    return this.main;
  }



  setmanu(main) {
    this.j.next(main);
  }
  getmanu(): Observable<any> {
    return this.manu;
  }

  getCollecion(main) {
    this.itemsCollection = this.db.collection<any>(main);
    return this.itemsCollection.valueChanges();
  }
  getxyz(name, main): Observable<any[]> {
    this.itemDoc = this.afs.doc(main + '/' + name);
    // return this.db.collection('home').valueChanges();
    this.item = this.itemDoc.valueChanges();
    // console.log(this.itemDoc.collection);
    return this.itemDoc.valueChanges();
  }


  addItem(data, name, main) {
    this.itemDoc = this.afs.doc(main + '/' + name);
    this.itemDoc.set(data);
  }
  update(data, name, main) {
    this.itemDoc = this.afs.doc(main + '/' + name);
    this.itemDoc.update(data);
  }
  deleteItem(name, main) {
    this.itemDoc = this.afs.doc(main + '/' + name);
    this.itemDoc.delete();
  }
  deleteDoc(name, main) {
    this.itemDoc = this.afs.doc(main + '/' + name);
    this.itemDoc.delete();
  }
  getDocId(main) {
    this.itemsCollection = this.db.collection<any>(main);
    return this.itemsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
}
