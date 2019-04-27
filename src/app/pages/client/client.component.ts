import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
feedback;
  constructor(private dataService: DataService ) { this.getFeedback() }
  getFeedback() {
    this.dataService.getxyz('hrtAP0DNep0GiCwDeIXg', 'feedback').subscribe(item => {
      console.log(item);
      this.feedback = item;
      this.feedback = this.feedback.fb;
    });
  }
  ngOnInit() {
  }

}
