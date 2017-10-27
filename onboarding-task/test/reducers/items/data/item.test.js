import { updateItem } from '../../../../src/actions/publicActions.ts';
import { ListItemData } from '../../../../src/models/ListItemData.ts';
import { item } from '../../../../src/reducers/items/data/item.ts';
import { ItemActions } from '../../../../src/constants/actionTypes.ts';
import { httpActionSuccessFactory } from '../../../../src/actions/httpActionFactories/httpActionStatusFactories.ts';

describe('Item Reducer', () => {
  const id = '650cb02b-de56-41a6-8693-50fbf3e40192';
  const createItem = (_value) =>
    new ListItemData({ id, value: 'Make tea' });
  const initialItem = new ListItemData({ localId: id, value: 'Make coffee' });

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
    const resultItem = item(initialItem, createItem);

    expect(resultItem).toBe(initialItem);
  });

  it('Returns default state on wrong input', () => {
    const resultState = item(undefined, createItem);

    expect(resultState).toEqual(new ListItemData());
  });

  it('Perform post and put to server correctly', () => {
    const expectedResult = new ListItemData({
      localId: id,
      id: '79c63dd4-b96f-4c6d-b505-0574f1344e70',
      value: 'Go home',
    });
    const action = httpActionSuccessFactory(ItemActions.POST_ITEM_TO_SERVER)('dbd223d5-0951-42db-8f8c-9d1c4eec68c4', {
      id: '79c63dd4-b96f-4c6d-b505-0574f1344e70',
      value: 'Go home',
    });

    const testResult = item(initialItem, action);

    expect(testResult).toEqual(expectedResult);
  });
});
