import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaffoldSearchComponent } from './scaffold-search.component';

describe('ScaffoldSearchComponent', () => {
  let component: ScaffoldSearchComponent;
  let fixture: ComponentFixture<ScaffoldSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScaffoldSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaffoldSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
