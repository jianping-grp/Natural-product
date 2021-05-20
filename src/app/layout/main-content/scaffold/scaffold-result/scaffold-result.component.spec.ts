import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaffoldResultComponent } from './scaffold-result.component';

describe('ScaffoldResultComponent', () => {
  let component: ScaffoldResultComponent;
  let fixture: ComponentFixture<ScaffoldResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScaffoldResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaffoldResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
