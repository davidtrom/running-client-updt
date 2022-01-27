import { ListItem } from './list-item.model';

describe('ListItem', () => {
  it('should create an instance', () => {
    expect(new ListItem("Item Description", 5)).toBeTruthy();
  });
});
