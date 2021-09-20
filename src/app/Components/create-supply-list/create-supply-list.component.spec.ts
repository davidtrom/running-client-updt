import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSupplyListComponent } from './create-supply-list.component';

describe('CreateSupplyListComponent', () => {
  let component: CreateSupplyListComponent;
  let fixture: ComponentFixture<CreateSupplyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSupplyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSupplyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
