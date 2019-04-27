import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(public dataService: DataService, private route: ActivatedRoute) {
    this.route.params.subscribe(n => {
      const dname = n.name;
      const dmain = n.main;
      console.log(n.name + n.main);
      this.dataService.getxyz(dname, dmain).subscribe(data => {
        this.data = data;
        console.log(this.data);
      });
    });
  }
  data;

  ngOnInit() {
  }

}
