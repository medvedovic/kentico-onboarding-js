import { createItem, updateItem } from '../../../../src/actions/publicActions';
import { ListItemData } from '../../../../src/models/ListItemData';
import { item } from '../../../../src/reducers/items/data/item';

describe('Item Reducer', () => {
  const id = '650cb02b-de56-41a6-8693-50fbf3e40192';
  const initialItem = new ListItemData({ localId: id, value: 'Make coffee' });
  const createItemAction = createItem(new ListItemData({ id, value: 'Make tea' }));

  it('Returns new updated item', () => {
    const action = updateItem(id, 'Make tea');
    const expectedResult = new ListItemData({ localId: id, value: 'Make tea' });
    const resultItem = item(initialItem, action);

    // Check for properties
    expect(resultItem).toEqual(expectedResult);
    // Check for reference
    expect(resultItem).not.toBe(expectedResult);
  });

  it('Returns the same item on wrong action', () => {
    const resultItem = item(initialItem, createItemAction);

    expect(resultItem).toBe(initialItem);
  });

  it('Returns default state on wrong input', () => {
    const resultState = item(undefined, createItemAction);

    expect(resultState).toEqual(new ListItemData());
  });
});
