import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  sdata;
  pdata;
  idata;
  constructor(public dataService: DataService) {
    dataService.getDocId('services').subscribe((data) => {
      this.sdata = data;
      // console.log(data);
    });
    dataService.getDocId('products').subscribe((data) => {
      this.pdata = data;
      // console.log(data);
    });
    dataService.getDocId('industries').subscribe((data) => {
      this.idata = data;
      // console.log(data);
    });

  }
  ngOnInit() {
  }

}
