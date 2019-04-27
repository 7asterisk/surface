import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {
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
      // console.log(n.name + n.main);
      this.dataService.getxyz(dname, this.dmain).subscribe(data => {
        this.data = data;
        // console.log(this.data);
      });
    });
  }
  data;
  ngOnInit() {

  }

}
