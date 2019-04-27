import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  milestone: any;
  aboutTxt: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getAbout();
  }


  getAbout() {
    this.dataService.getxyz('AlSx1gj9VWLCU582cSOT', 'About').subscribe(item => {
      console.log(item);
      const about: any = item;
      this.milestone = about.Milestone;
      this.aboutTxt = about.aboutTxt;
    });

  }

}
