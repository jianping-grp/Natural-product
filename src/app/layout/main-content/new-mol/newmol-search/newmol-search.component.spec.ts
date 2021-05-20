import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewmolSearchComponent } from './newmol-search.component';

describe('NewmolSearchComponent', () => {
  let component: NewmolSearchComponent;
  let fixture: ComponentFixture<NewmolSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewmolSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewmolSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
