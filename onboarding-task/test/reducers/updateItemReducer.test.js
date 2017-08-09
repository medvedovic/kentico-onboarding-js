import { createItem, updateItem } from '../../src/actions/userActions';
import { ListItemData as ListItemModel } from '../../src/models/ListItemData';
import { generateGuid } from '../../src/utils/generateGuid';
import { item } from '../../src/reducers/items/data/item';

describe('Item Reducer', () => {
  const id = generateGuid();
  const initialItem = new ListItemModel({ id, value: 'Make coffee' });

  it('Returns new updated item', () => {
    const action = updateItem(id, 'Make tea');
    const expectedResult = new ListItemModel({ id, value: 'Make tea' });
    const resultItem = item(initialItem, action);

    expect(resultItem).toEqual(expectedResult);
    expect(resultItem).not.toBe(expectedResult);
  });

  it('Returns default state on wrong input', () => {
    const action = createItem(new ListItemModel({ id, value: 'Make tea' }));

    const resultItem = item(initialItem, action);

    expect(resultItem).toBe(initialItem);
  });
});
