import { updateItem } from '../../../../src/actions/publicActions.ts';
import { ListItemData } from '../../../../src/models/ListItemData.ts';
import { item } from '../../../../src/reducers/items/data/item.ts';
import { POST_ITEM_TO_SERVER } from '../../../../src/constants/actionTypes.ts';
import { handleSuccessfulRequest } from '../../../../src/actions/httpActionFactories/httpActionStatusFactories.ts';

describe('itemReducer', () => {
  const id = '650cb02b-de56-41a6-8693-50fbf3e40192';
  const initialItem = new ListItemData({ id, value: 'Make coffee' });

  it('returns new updated item', () => {
    const action = updateItem(id, 'Make tea');
    const expectedResult = new ListItemData({ id, value: 'Make tea' });

    const resultItem = item(initialItem, action);

    expect(resultItem).toEqual(expectedResult);
    expect(resultItem).not.toBe(expectedResult);
  });

  it('returns correct state on post item to server success', () => {
    const expectedResult = new ListItemData({
      id: '79c63dd4-b96f-4c6d-b505-0574f1344e70',
      value: 'Go home',
    });
    const action = handleSuccessfulRequest(POST_ITEM_TO_SERVER.SUCCESS)('dbd223d5-0951-42db-8f8c-9d1c4eec68c4', {
      id: '79c63dd4-b96f-4c6d-b505-0574f1344e70',
      value: 'Go home',
    });

    const testResult = item(initialItem, action);

    expect(testResult).toEqual(expectedResult);
  });

  it('returns default state', () => {
    const resultState = item(undefined, {});

    expect(resultState).toEqual(new ListItemData());
  });
});

