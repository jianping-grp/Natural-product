import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmpCardComponent } from './mmp-card.component';

describe('MmpCardComponent', () => {
  let component: MmpCardComponent;
  let fixture: ComponentFixture<MmpCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MmpCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmpCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
