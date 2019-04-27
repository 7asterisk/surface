import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  sdata: any[];

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.dataService.getmain().subscribe(d => {
      this.main = d;
      // console.log(d);
    });
    this.dataService.getmanu().subscribe(d => {
      this.menu = d;
      // console.log(d);
    });
    this.getMenu();
  }

  main;
  menu;
  pdata;
  idata;

  getMenu() {
    // this.dataService.setmain(main);
    this.dataService.getDocId('services').subscribe((data) => {
      this.sdata = data;
      // console.log(data);
    });
    this.dataService.getDocId('products').subscribe((data) => {
      this.pdata = data;
      // console.log(data);
    });
    this.dataService.getDocId('industries').subscribe((data) => {
      this.idata = data;
      // console.log(data);
    });
  }



  ngOnInit() {
  }
}
