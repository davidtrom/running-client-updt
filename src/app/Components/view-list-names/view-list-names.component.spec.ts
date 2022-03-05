import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewListNamesComponent } from './view-list-names.component';

describe('ViewListNamesComponent', () => {
  let component: ViewListNamesComponent;
  let fixture: ComponentFixture<ViewListNamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewListNamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewListNamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
