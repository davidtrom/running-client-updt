import { SupplyList } from './supply-list.model';

describe('SupplyList', () => {
  it('should create an instance', () => {
    expect(new SupplyList(1, "my List", [])).toBeTruthy();
  });
});
