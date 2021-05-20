import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesCardDComponent } from './properties-card-d.component';

describe('PropertiesCardDComponent', () => {
  let component: PropertiesCardDComponent;
  let fixture: ComponentFixture<PropertiesCardDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertiesCardDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesCardDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
