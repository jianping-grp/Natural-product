import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmpSingleComponent } from './mmp-single.component';

describe('MmpSingleComponent', () => {
  let component: MmpSingleComponent;
  let fixture: ComponentFixture<MmpSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MmpSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmpSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
