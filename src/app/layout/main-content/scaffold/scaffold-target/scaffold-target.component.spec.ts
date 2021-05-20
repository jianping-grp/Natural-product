import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaffoldTargetComponent } from './scaffold-target.component';

describe('ScaffoldTargetComponent', () => {
  let component: ScaffoldTargetComponent;
  let fixture: ComponentFixture<ScaffoldTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScaffoldTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaffoldTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
