import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data;
  constructor(public dataService: DataService) {
    dataService.getDocId('services').subscribe((data) => {
      this.data = data;
      console.log(data);
    });
  }
  trim(d) {
    return d.substring(0, 150);
  }
  ngOnInit() {
  }

}
