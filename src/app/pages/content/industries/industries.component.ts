import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-industries',
  templateUrl: './industries.component.html',
  styleUrls: ['./industries.component.scss']
})
export class IndustriesComponent implements OnInit {

  data;
  constructor(public dataService: DataService) {
    dataService.getDocId('industries').subscribe((data) => {
    this.data = data;
    console.log(data);
    });
  }
  ngOnInit() {
  }

}
