import { createItem, updateItem } from '../../src/actions/userActions';
import { ListItemData as ListItemModel } from '../../src/models/ListItemData';
import { generateGuid } from '../../src/utils/generateGuid';
import { updateItemReducer } from '../../src/reducers/updateItemReducer';

describe('Item Reducer', () => {
  const guid = generateGuid();
  const initialItem = new ListItemModel({ guid, value: 'Make coffee' });

  it('Returns new updated item', () => {
    const action = updateItem(guid, 'Make tea');
    const expectedResult = new ListItemModel({ guid, value: 'Make tea' });
    const resultItem = updateItemReducer(initialItem, action);

    expect(resultItem).toEqual(expectedResult);
    expect(resultItem).not.toBe(expectedResult);
  });

  it('Returns default state on wrong input', () => {
    const action = createItem(new ListItemModel({ guid, value: 'Make tea' }));

    const resultItem = updateItemReducer(initialItem, action);

    expect(resultItem).toBe(initialItem);
  });
});
