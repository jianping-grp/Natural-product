import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMmpComponent } from './search-mmp.component';

describe('SearchMmpComponent', () => {
  let component: SearchMmpComponent;
  let fixture: ComponentFixture<SearchMmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
