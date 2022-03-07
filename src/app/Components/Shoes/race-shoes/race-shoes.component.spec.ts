import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceShoesComponent } from './race-shoes.component';

describe('RaceShoesComponent', () => {
  let component: RaceShoesComponent;
  let fixture: ComponentFixture<RaceShoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaceShoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceShoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
