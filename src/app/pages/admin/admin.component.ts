import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  contentToAdd = { title: '', content: '', url: '' };
  dataToAdd = { mainHead: '', mainContent: '', contents: [] };
  data;
  title;
  content;
  position = -2;
  menu = [];
  newMenuItem;
  add = false;
  addNew = false;
  newContent;
  newTitle;
  currentMenu;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: Observable<number>;
  Url = '';
  filename;
  main;
  loder = false;
  changedId = '';
  private feedbackCollection: AngularFirestoreCollection<any>;
  feedback: any;
  feedbacktoAdd = { fbTxt: '', fbFrom: '' };
  activefeedback = false;
  activeabout = false;
  feedbackPosition: any;
  fbFrom;
  fbTxt;
  aboutTxt;
  milestone: any[];
  aboutTxtToEdit;
  editAboutOf: string;
  contentLen: any;
  activeclient = false;
  ref1: AngularFireStorageReference;
  task1: AngularFireUploadTask;
  filename1: any;
  downloadURL1: Observable<any>;
  Url1: any;
  clientPosition: any;
  client: any;
  client1: any;
  clientPosition1: number;
  constructor(public dataService: DataService, private storage: AngularFireStorage, private db: AngularFirestore) {
    this.feedbackCollection = this.db.collection('feedback');
    this.getFeedback();
    this.getAbout();
    this.getClients();
  }
  ngOnInit() {
  }

  getClients() {
    this.dataService.getxyz('oms', 'clients').subscribe(item => {
      console.log(item);
      this.client = item;
      this.client = this.client.cl;
      this.clientPosition = this.client.length;
    });
    this.dataService.getxyz('reference', 'clients').subscribe(item => {
      console.log(item);
      this.client1 = item;
      this.client1 = this.client1.cl;
      this.clientPosition1 = this.client1.length;
    });
  }

  clintForm() {
    this.activeclient = true;
    this.activefeedback = false;
    this.activeabout = false;
  }

  addClient(event, n) {
    const id = Math.random().toString(36).substring(2);
    this.ref1 = this.storage.ref('client' + id);
    this.filename1 = event.target.files[0];
    this.task1 = this.ref1.put(this.filename1);
    this.task1.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL1 = this.ref1.getDownloadURL();
        this.downloadURL1.subscribe(url => {
          this.Url1 = url.toString();
          console.log(this.Url1);

          if (n === 'o') {
            const cl = { cl: [] };
            this.client[this.clientPosition] = this.Url1;
            cl.cl = this.client;
            this.clientPosition = this.client.length;
            this.dataService.update(cl, 'oms', 'clients');
          } if (n === 'r') {
            const cl = { cl: [] };
            this.client1[this.clientPosition1] = this.Url1;
            cl.cl = this.client1;
            this.clientPosition1 = this.client1.length;
            this.dataService.update(cl, 'reference', 'clients');

          }

        });
      })
    )
      .subscribe();
  }
  deleteClient(i, n) {
    if (n === 'o') {
      const d = this.client.splice(i, 1);
      console.log(d);
      console.log(this.client);
      this.storage.storage.refFromURL(d[0]).delete();

      const cl = { cl: [] };
      cl.cl = this.client;
      this.clientPosition = this.client.length;

      this.dataService.update(cl, 'oms', 'clients');

    } else if (n === 'r') {
      const d = this.client1.splice(i, 1);
      this.storage.storage.refFromURL(d[0]).delete();

      const cl = { cl: [] };
      cl.cl = this.client1;
      this.clientPosition1 = this.client.length;

      this.dataService.update(cl, 'reference', 'clients');

    }

  }



  changeDocID() {
    const d = this.data;
    console.log(this.changedId);
    this.deleteDoc();
    this.dataService.addItem(d, this.changedId, this.main);
    this.menu.push(this.changedId);
  }


  editFeedback(i) {
    this.fbTxt = this.feedback[i].fbTxt;
    // this.fbFrom = this.feedback[i].fbFrom;
    console.log(this.fbFrom + this.fbTxt);
    this.feedbackPosition = i;
  }

  getFeedback() {
    this.dataService.getxyz('hrtAP0DNep0GiCwDeIXg', 'feedback').subscribe(item => {
      console.log(item);
      this.feedback = item;
      this.feedback = this.feedback.fb;
      this.feedbackPosition = this.feedback.length;
    });
  }

  deleteFeedback(i) {
    this.feedback.splice(i, 1);
    const fb = { fb: [] };
    fb.fb = this.feedback;
    this.dataService.update(fb, 'hrtAP0DNep0GiCwDeIXg', 'feedback');
    this.feedbackPosition = this.feedback.length;
    this.fbFrom = '';
    this.fbTxt = '';
  }

  addfeedback() {
    const fb = { fb: [] };
    this.feedbacktoAdd.fbFrom = this.fbFrom;
    this.feedbacktoAdd.fbTxt = this.fbTxt;
    this.feedback[this.feedbackPosition] = this.feedbacktoAdd;
    fb.fb = this.feedback;
    console.log(fb);
    this.dataService.update(fb, 'hrtAP0DNep0GiCwDeIXg', 'feedback');
    this.feedbackPosition = this.feedback.length;
    this.fbFrom = '';
    this.fbTxt = '';
  }

  FeedbackForm() {
    this.activefeedback = true;
    this.activeabout = false;
    this.activeclient = false;
  }


  getAbout() {
    this.dataService.getxyz('AlSx1gj9VWLCU582cSOT', 'About').subscribe(item => {
      console.log(item);
      const about: any = item;
      this.milestone = about.Milestone;
      this.aboutTxt = about.aboutTxt;
    });

  }

  addAbout() {
    if (this.editAboutOf === 'a') {
      this.aboutTxt = this.aboutTxtToEdit;
    } else if (this.editAboutOf === 'm') {
      this.milestone = this.aboutTxtToEdit;
    }
    const about = { Milestone: this.milestone, aboutTxt: this.aboutTxt }
    this.dataService.update(about, 'AlSx1gj9VWLCU582cSOT', 'About');
  }

  editAbout(n) {
    if (n === 'a') {
      this.aboutTxtToEdit = this.aboutTxt;
      this.editAboutOf = 'a';
    } else
      if (n === 'm') {
        this.aboutTxtToEdit = this.milestone;
        this.editAboutOf = 'm';
      }
  }
  aboutForm() {
    this.activeabout = true;
    this.activeclient = false;
    this.activefeedback = false;
  }
  getMenu(main) {
    this.main = main;
    this.menu = [];
    this.activefeedback = false;
    this.activeabout = false;
    this.dataService.getDocId(this.main).subscribe(d => {
      // this.menu = d;
      for (let i = this.menu.length; i < d.length; i++) {
        this.menu.push(d[i].id);
      }
      console.log(this.menu);
    });
  }



  swapUp(i) {
    const temp = this.dataToAdd.contents[i];
    this.dataToAdd.contents[i] = this.dataToAdd.contents[i - 1];
    this.dataToAdd.contents[i - 1] = temp;
    console.log(this.dataToAdd.contents[i]);
    this.dataService.update(this.dataToAdd, this.currentMenu, this.main);
    this.position = -2;
    this.title = '';
    this.content = '';
    this.contentToAdd.url = null;
    this.filename = null;
    this.loder = false;
  }

  swapDown(i) {
    console.log(i);

    if (this.contentLen > i + 1) {
      const temp = this.dataToAdd.contents[i];
      this.dataToAdd.contents[i] = this.dataToAdd.contents[i + 1];
      this.dataToAdd.contents[i + 1] = temp;
      console.log(this.dataToAdd.contents[i]);
      this.dataService.update(this.dataToAdd, this.currentMenu, this.main);
      this.position = -2;
      this.title = '';
      this.content = '';
      this.contentToAdd.url = null;
      this.filename = null;
      this.loder = false;
    }
  }



  fileToUplode(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.storage.ref(id);
    console.log(event.target.files);
    this.filename = event.target.files[0];
  }


  addDoc(event, docId) {
    if (event.key === 'Enter') {
      console.log(docId);
      this.menu.push(docId);
      this.newMenuItem = docId;
      this.add = false;
      this.addNew = true;
    }
  }
  addNewDoc() {
    this.dataToAdd.contents = [{}];
    this.dataToAdd.mainHead = this.newTitle;
    this.dataToAdd.mainContent = this.newContent;
    console.log(this.newTitle + this.newContent);
    this.dataService.addItem(this.dataToAdd, this.newMenuItem, this.main);
    this.addNew = false;
    this.content = '';
    this.title = '';
    this.Url = '';
  }
  getData(name) {
    this.currentMenu = name;
    this.changedId = this.currentMenu;
    this.dataService.getxyz(name, this.main).subscribe(item => {
      console.log(item);
      this.data = item;
      this.contentLen = this.data.contents.length;
      this.dataToAdd = this.data;
    });
    this.content = '';
    this.title = '';
    this.position = -2;
    this.addNew = false;
  }
  mainEdit() {
    this.position = -1;
    this.title = this.data.mainHead;
    this.content = this.data.mainContent;
  }
  editContents(i) {
    console.log(this.data.contents[i].title);
    this.position = i;
    if (this.data.contents[i].title) {
      this.title = this.data.contents[i].title;
    }
    if (this.data.contents[i].content) {
      this.content = this.data.contents[i].content;
    }
    if (this.data.contents[i].url) {
      this.Url = this.data.contents[i].url;
    }
  }
  updateData() {
    this.loder = true;
    if (this.position === -1) {
      this.dataToAdd.mainContent = this.content;
      this.dataToAdd.mainHead = this.title;
      this.dataService.update(this.dataToAdd, this.currentMenu, this.main);
      this.loder = false;
    } else if (this.position === -2) {
      // console.log(this.position);
      this.position = this.dataToAdd.contents.length;
      if (this.filename) {
        this.updateContent();
      } else {
        this.updateContentWOImg();
      }

    } else {
      if (this.filename) {
        this.updateContent();
      } else {
        this.updateContentWOImg();
      }
    }
  }
  deleteContent(i) {
    if (i !== -1) {
      const d = this.dataToAdd.contents.splice(i, 1);
      if (d[0].url.length > 2) {
        console.log(d[0].url);
        this.storage.storage.refFromURL(d[0].url).delete();
      }
      this.dataService.update(this.dataToAdd, this.currentMenu, this.main);
    }
  }
  deleteDoc() {
    this.dataService.deleteDoc(this.currentMenu, this.main);
    const i = this.menu.indexOf(this.currentMenu);
    delete (this.menu[i]);
  }


  updateContentWOImg() {
    console.log(this.Url);
    this.contentToAdd.title = this.title;
    this.contentToAdd.content = this.content;
    if (this.Url) {
      this.contentToAdd.url = this.Url;
      this.dataToAdd.contents[this.position] = this.contentToAdd;
      // console.log(this.dataToAdd);
      this.dataService.update(this.dataToAdd, this.currentMenu, this.main);
    } else {
      this.dataToAdd.contents[this.position] = this.contentToAdd;
      // console.log(this.dataToAdd);
      this.dataService.update(this.dataToAdd, this.currentMenu, this.main);

    }
    this.position = -2;
    this.title = '';
    this.content = '';
    this.Url = '';
    this.filename = null;
    this.contentToAdd.url = null;
    this.loder = false;
  }

  updateContent() {

    console.log(this.filename);
    this.task = this.ref.put(this.filename);
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL();
        this.downloadURL.subscribe(url => {
          this.Url = url.toString();
          this.contentToAdd.title = this.title;
          this.contentToAdd.content = this.content;
          this.contentToAdd.url = this.Url;
          this.dataToAdd.contents[this.position] = this.contentToAdd;
          console.log(this.dataToAdd);
          this.dataService.update(this.dataToAdd, this.currentMenu, this.main);
          this.position = -2;
          this.title = '';
          this.content = '';
          this.contentToAdd.url = null;
          this.Url = null;
          this.filename = null;
          this.loder = false;
        });
      })
    )
      .subscribe();
  }

}
