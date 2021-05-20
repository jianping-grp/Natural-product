import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewmolResultComponent } from './newmol-result.component';

describe('NewmolResultComponent', () => {
  let component: NewmolResultComponent;
  let fixture: ComponentFixture<NewmolResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewmolResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewmolResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
