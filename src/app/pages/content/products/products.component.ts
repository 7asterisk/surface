import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  data;
  constructor(public dataService: DataService) {
    dataService.getDocId('products').subscribe((data) => {
      this.data = data;
      // console.log(data);
    });
  }
  trim(d) {
    return d.substring(0, 150);
  }
}
