import { itemFactory } from '../../src/utils/itemFactory';

describe('Item factory', () => {
  it('generates new list item from value', () => {
    const newItem = itemFactory('Make a sandwich');

    expect(newItem.value).toBe('Make a sandwich');
    expect(newItem.guid.length).toBe(36);
  });
});
