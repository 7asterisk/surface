import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = [];
  active = false;
  sItem; iItem; pItem;

  sfilteredOptions: Observable<string[]>;
  pfilteredOptions: Observable<string[]>;
  ifilteredOptions: Observable<string[]>;
  sdata = [];
  pdata = [];
  idata = [];

  constructor(public dataService: DataService, public router: Router) {
    dataService.getDocId('services').subscribe((data) => {
      this.sdata = [];
      for (let i = 0; i < data.length; i++) {
        this.sdata.push(data[i].id);
      }
      // console.log(this.sdata);
    });
    dataService.getDocId('products').subscribe((data) => {
      this.pdata = [];
      for (let i = 0; i < data.length; i++) {
        this.pdata.push(data[i].id);
      }
    });
    dataService.getDocId('industries').subscribe((data) => {
      this.idata = [];
      for (let i = 0; i < data.length; i++) {
        this.idata.push(data[i].id);
      }
    });
  }


  routeTo() {
    // if (e.key === 'Enter') {
    //   this.router.navigate(['/-/pdetail', { main: main, name: menu }]);
    // }
    console.log('hii');
  }


  toggle() {
    this.active = !this.active;
  }


  ngOnInit() {
    this.sfilteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._sfilter(value))
    );
    this.pfilteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._pfilter(value))
    );
    this.ifilteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._ifilter(value))
    );
  }

  private _sfilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.sdata.filter(option => option.toLowerCase().indexOf(filterValue) !== -1);
  }

  private _pfilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.pdata.filter(option => option.toLowerCase().indexOf(filterValue) !== -1);
  }

  private _ifilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.idata.filter(option => option.toLowerCase().indexOf(filterValue) !== -1);
  }

}
