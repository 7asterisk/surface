import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustriesDetailComponent } from './industries-detail.component';

describe('IndustriesDetailComponent', () => {
  let component: IndustriesDetailComponent;
  let fixture: ComponentFixture<IndustriesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndustriesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustriesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
