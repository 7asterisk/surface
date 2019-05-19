import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent implements OnInit {

  ref1: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL1: Observable<number>;


  myform: FormGroup;
  firstName: FormControl;
  company: FormControl;
  email: FormControl;
  country: FormControl;
  services: FormControl;
  pno: FormControl;
  txt: FormControl;
  uploadPercent1: any;
  Url1: string;
  filename1: any;
  mainerrors: boolean;
  txtV: any;
  nameV: any;
  emailV: any;
  pnoV: any;
  qualification: any;
  sucess: boolean;


  constructor(private dataService: DataService, private storage: AngularFireStorage) { }


  fileToUplode1(event) {
    const file = event.target.files[0];
    const filePath = '000request' + file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent1 = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL1 = fileRef.getDownloadURL();
        this.downloadURL1.subscribe(url => {
          this.Url1 = url.toString();
          console.log(this.Url1);
        });
      })
    )
      .subscribe();

    this.filename1 = event.target.files[0];
  }


  createFormControls() {
    this.firstName = new FormControl('', Validators.required);
    this.company = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[^ @]*@[^ @]*')
    ]);
    this.pno = new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ]);
    this.country = new FormControl('');
    this.services = new FormControl('');
    this.txt = new FormControl('');
  }

  createForm() {
    this.myform = new FormGroup({
      name: new FormGroup({
        firstName: this.firstName,
        company: this.company
      }),
      email: this.email,
      pno: this.pno,
      country: this.country,
      services: this.services,
      txt: this.txt,
    });
  }
  onSubmit() {
    if (this.myform.valid) {
      this.dataService.sendResume(
        this.txtV, this.nameV, this.emailV, this.pnoV, this.qualification, this.Url1
      );
      this.myform.reset();
      this.sucess=true;
      // window.alert('Thank You! your  Form Submited..');
      this.mainerrors = false;
    } else {
      this.mainerrors = true;
    }
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.sucess = false;
  }

}
