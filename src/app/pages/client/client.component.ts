import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  feedback;
  client: any;
  clientPosition: any;
  client1: any;
  clientPosition1: number;
  constructor(private dataService: DataService) {
    this.getFeedback();
    this.getClients();
  }
  getFeedback() {
    this.dataService.getxyz('hrtAP0DNep0GiCwDeIXg', 'feedback').subscribe(item => {
      console.log(item);
      this.feedback = item;
      this.feedback = this.feedback.fb;
    });
  }


  getClients() {
    this.dataService.getxyz('oms', 'clients').subscribe(item => {
      console.log(item);
      this.client = item;
      this.client = this.client.cl;
      this.clientPosition = this.client.length;
    });
    this.dataService.getxyz('reference', 'clients').subscribe(item => {
      console.log(item);
      this.client1 = item;
      this.client1 = this.client1.cl;
      this.clientPosition1 = this.client1.length;
    });
  }
  ngOnInit() {
  }

}
