import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRaceShoeComponent } from './add-race-shoe.component';

describe('AddRaceShoeComponent', () => {
  let component: AddRaceShoeComponent;
  let fixture: ComponentFixture<AddRaceShoeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRaceShoeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRaceShoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
