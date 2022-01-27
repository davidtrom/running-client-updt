import { RaceShoe } from './race-shoe.model';

describe('RaceShoe', () => {
  it('should create an instance', () => {
    expect(new RaceShoe(4, "Saucony", "Endorphin Pro 2", "Best racing shoe ever", 0, new Date("2021-11-20"), true)).toBeTruthy();
  });
});
