import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  filename2: any;
  filename1: any;
  uploding1 = false;
  uploding2 = false;
  Url1: string;
  Url2: string;
  uploadPercent1: Observable<number>;
  downloadURL2: Observable<any>;
  uploadPercent2: Observable<number>;
  constructor(public dataService: DataService, private storage: AngularFireStorage) {
    dataService.getDocId('services').subscribe((data) => {
      this.data = data;
      // console.log(data);
    });
    dataService.getDocId('products').subscribe((data) => {
      this.pdata = data;
      // console.log(data);
    });
  }

  data;
  pdata;

  ref1: AngularFireStorageReference;
  ref2: AngularFireStorageReference;
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
  nameV = '';
  companyV = '';
  emailV = '';
  countryV = '';
  pnoV = '';
  txtV = '';
  servicesV = '';
  file1;
  file2;
  submiting;


  country_list = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda',
    'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas'
    , 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda',
    'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands'
    , 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde',
    'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica'
    , 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti',
    'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea'
    , 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France',
    'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana'
    , 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea',
    'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India'
    , 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan',
    'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia'
    , 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau',
    'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania'
    , 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco',
    'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia'
    , 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine',
    'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal'
    , 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon',
    'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles'
    , 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain',
    'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan'
    , 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania',
    'Thailand', 'Timor L\'Este', 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia'
    , 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates',
    'United Kingdom', 'United States', 'United States Minor Outlying Islands', 'Uruguay'
    , 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'];

  mainerrors = false;



  fileToUplode1(event) {

    this.uploding1 = true;
    const file = event.target.files[0];
    const filePath = 'attach/' + file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent1 = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL1 = fileRef.getDownloadURL();
        this.downloadURL1.subscribe(url => {
          this.Url1 = url.toString();
          console.log(this.Url1);
          this.uploding1 = false;
        });
      })
    )
      .subscribe();

    this.filename1 = event.target.files[0];
  }

  fileToUplode2(event) {

    this.uploding2 = true;
    const file = event.target.files[0];
    const filePath = 'attach/' + file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent2 = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL2 = fileRef.getDownloadURL();
        this.downloadURL2.subscribe(url => {
          this.Url2 = url.toString();
          console.log(this.Url2);
          this.uploding2 = false;
        });
      })
    )
      .subscribe();
    this.filename2 = event.target.files[0];
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
      this.dataService.sendMail(
        this.txtV, this.nameV, this.emailV, this.pnoV, this.companyV, this.countryV, this.servicesV, this.Url1, this.Url2
      );
      this.myform.reset();
      this.submiting = true;
      this.mainerrors = false;
    } else {
      this.submiting = true;
      this.mainerrors = true;
    }
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

}

