import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSupplyListComponent } from './view-supply-list.component';

describe('ViewSupplyListComponent', () => {
  let component: ViewSupplyListComponent;
  let fixture: ComponentFixture<ViewSupplyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSupplyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSupplyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
