import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceShoeDetailComponent } from './race-shoe-detail.component';

describe('RaceShoeDetailComponent', () => {
  let component: RaceShoeDetailComponent;
  let fixture: ComponentFixture<RaceShoeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaceShoeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceShoeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
