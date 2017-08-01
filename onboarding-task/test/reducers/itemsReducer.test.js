import { generateGuid } from '../../src/utils/generateGuid';
import { ListItemData as ListItemModel } from '../../src/models/ListItemData';
import { OrderedMap } from 'immutable';
import { itemFactory } from '../../src/utils/itemFactory';
import { items } from '../../src/reducers/items/items';
import { createItem, deleteItem, updateItem } from '../../src/actions/userActions';

describe('List App reducer', () => {
  const _guid1 = generateGuid();
  const _guid2 = generateGuid();
  const initialState = new OrderedMap([
    [_guid1, new ListItemModel({ guid: _guid1, value: 'Make coffee' })],
    [_guid2, new ListItemModel({ guid: _guid2, value: 'Master React' })],
  ]);

  it('Adds new item properly', () => {
    const newItem = itemFactory('Make a sandwich');
    const expectedStoreState = new OrderedMap([
      [_guid1, new ListItemModel({ guid: _guid1, value: 'Make coffee' })],
      [_guid2, new ListItemModel({ guid: _guid2, value: 'Master React' })],
      [newItem.guid, newItem],
    ]);

    const result = items(initialState, createItem(newItem));

    expect(result).toEqual(expectedStoreState);
  });

  it('Updates item properly', () => {
    const expectedStoreState = new OrderedMap([
      [_guid1, new ListItemModel({ guid: _guid1, value: 'Do stuff' })],
      [_guid2, new ListItemModel({ guid: _guid2, value: 'Master React' })],
    ]);

    const testStore = items(initialState, updateItem(_guid1, 'Do stuff'));

    expect(testStore).toEqual(expectedStoreState);
  });

  it('Deletes item properly', () => {
    const expectedStoreState = new OrderedMap([
      [_guid2, new ListItemModel({ guid: _guid2, value: 'Master React' })],
    ]);

    const testStore = items(initialState, deleteItem(_guid1));

    expect(testStore).toEqual(expectedStoreState);
  });
});
