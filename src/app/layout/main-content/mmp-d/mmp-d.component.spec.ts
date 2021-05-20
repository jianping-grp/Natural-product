import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmpDComponent } from './mmp-d.component';

describe('MmpDComponent', () => {
  let component: MmpDComponent;
  let fixture: ComponentFixture<MmpDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MmpDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmpDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
