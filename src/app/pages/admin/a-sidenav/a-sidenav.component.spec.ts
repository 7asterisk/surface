import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ASidenavComponent } from './a-sidenav.component';

describe('ASidenavComponent', () => {
  let component: ASidenavComponent;
  let fixture: ComponentFixture<ASidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ASidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ASidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
