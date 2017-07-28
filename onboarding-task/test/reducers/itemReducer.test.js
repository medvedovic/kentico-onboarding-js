import { createItem, updateItem } from '../../src/actions/userActions';
import { ListItem as ListItemModel } from '../../src/models/ListItem';
import { generateGuid } from '../../src/utils/generateGuid';
import { item } from '../../src/reducers/itemReducer';

describe('Item Reducer', () => {
  const guid = generateGuid();
  const initialItem = new ListItemModel({ guid, value: 'Make coffee' });

  it('Returns new updated item', () => {
    const action = updateItem(guid, 'Make tea');
    const expectedResult = new ListItemModel({ guid, value: 'Make tea' });
    const resultItem = item(initialItem, action);

    expect(resultItem).toEqual(expectedResult);
    expect(resultItem).not.toBe(expectedResult);
  });

  it('Returns default state on wrong input', () => {
    const action = createItem(new ListItemModel({ guid, value: 'Make tea' }));

    const resultItem = item(initialItem, action);

    expect(resultItem).toBe(initialItem);
  });
});
