import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {


  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  id;
  constructor(public dataService: DataService, private route: ActivatedRoute, private _formBuilder: FormBuilder) {
    this.route.params.subscribe(n => {
      const dname = n.name;
      const dmain = n.main;
      this.id = n.id;
      console.log(n.name + n.main);
      this.dataService.getxyz(dname, dmain).subscribe(data => {
        this.data = data;
        console.log(this.data);
      });
    });
  }
  data;
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
