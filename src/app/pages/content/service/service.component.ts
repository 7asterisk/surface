import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
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
