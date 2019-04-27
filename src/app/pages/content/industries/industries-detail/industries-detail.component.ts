import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-industries-detail',
  templateUrl: './industries-detail.component.html',
  styleUrls: ['./industries-detail.component.scss']
})
export class IndustriesDetailComponent implements OnInit {

  dmain;
  toshow = false;
  constructor(public dataService: DataService, private route: ActivatedRoute) {
    this.route.params.subscribe(n => {
      const dname = n.name;
      this.dmain = n.main;
      if (this.dmain === 'services') {
        this.toshow = true;
      } else {
        this.toshow = false;
      }
      dataService.setmain(this.dmain);
      dataService.setmanu(dname);
      this.dataService.getxyz(dname, this.dmain).subscribe(data => {
        this.data = data ;
        this.data.contents.splice(0, 1);
      });
    });
  }
  data;
  ngOnInit() { }
}
