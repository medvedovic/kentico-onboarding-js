import { generateGuid } from '../../src/utils/generateGuid';
import { ListItemData as ListItemModel } from '../../src/models/ListItemData';
import { OrderedMap } from 'immutable';
import { itemFactory } from '../../src/utils/itemFactory';
import { items } from '../../src/reducers/items/items';
import { createItem, deleteItem, updateItem } from '../../src/actions/userActions';

describe('List App reducer', () => {
  const _id1 = generateGuid();
  const _id2 = generateGuid();
  const initialState = new OrderedMap([
    [_id1, new ListItemModel({ id: _id1, value: 'Make coffee' })],
    [_id2, new ListItemModel({ id: _id2, value: 'Master React' })],
  ]);

  it('Adds new item properly', () => {
    const newItem = itemFactory('Make a sandwich');
    const expectedStoreState = new OrderedMap([
      [_id1, new ListItemModel({ id: _id1, value: 'Make coffee' })],
      [_id2, new ListItemModel({ id: _id2, value: 'Master React' })],
      [newItem.id, newItem],
    ]);

    const result = items(initialState, createItem(newItem));

    expect(result).toEqual(expectedStoreState);
  });

  it('Updates item properly', () => {
    const expectedStoreState = new OrderedMap([
      [_id1, new ListItemModel({ id: _id1, value: 'Do stuff' })],
      [_id2, new ListItemModel({ id: _id2, value: 'Master React' })],
    ]);

    const testStore = items(initialState, updateItem(_id1, 'Do stuff'));

    expect(testStore).toEqual(expectedStoreState);
  });

  it('Deletes item properly', () => {
    const expectedStoreState = new OrderedMap([
      [_id2, new ListItemModel({ id: _id2, value: 'Master React' })],
    ]);

    const testStore = items(initialState, deleteItem(_id1));

    expect(testStore).toEqual(expectedStoreState);
  });
});
