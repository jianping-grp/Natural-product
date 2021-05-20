import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewmolDetailComponent } from './newmol-detail.component';

describe('NewmolDetailComponent', () => {
  let component: NewmolDetailComponent;
  let fixture: ComponentFixture<NewmolDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewmolDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewmolDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
