import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss']
})
export class ProductsDetailComponent implements OnInit {
  name;
  constructor(public dataService: DataService, private route: ActivatedRoute) {
    this.route.params.subscribe(n => {
      const dname = n.name;
      this.name = dname;
      const dmain = n.main;
      dataService.setmain(dmain);
      dataService.setmanu(dname);
      // console.log(n.name + n.main);
      this.dataService.getxyz(dname, dmain).subscribe(data => {
        this.data = data;
        // console.log(this.data);
      });
    });
  }
  data;
  ngOnInit() {
  }

}
