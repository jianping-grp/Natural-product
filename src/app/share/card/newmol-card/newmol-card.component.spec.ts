import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewmolCardComponent } from './newmol-card.component';

describe('NewmolCardComponent', () => {
  let component: NewmolCardComponent;
  let fixture: ComponentFixture<NewmolCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewmolCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewmolCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
