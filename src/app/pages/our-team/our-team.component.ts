import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html',
  styleUrls: ['./our-team.component.scss']
})
export class OurTeamComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  img = ['DSC_0501', 'DSC_0527', 'DSC_0507', 'DSC_0521',
    'DSC_0544', 'DSC_0547', 'DSC_0552', 'DSC_0557', 'DSC_0562',
    'DSC_0583', 'DSC_0576', 'DSC_0581'];
  constructor() { }

  ngOnInit() {
  }

}
