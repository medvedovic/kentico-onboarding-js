import { itemFactory } from '../../src/utils/itemFactory';

describe('Item factory', () => {
  it('no two items has the same id', () => {
    const newItem = itemFactory('Make a sandwich');
    const newItem2 = itemFactory('Make a sandwich');

    expect(newItem.id).not.toEqual(newItem2.id);
  });
});
