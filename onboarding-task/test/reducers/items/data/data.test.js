import { ListItemData as ListItemModel } from '../../../../src/models/ListItemData.ts';
import { Map } from 'immutable';
import { data } from '../../../../src/reducers/items/data/data.ts';
import { deleteItem, updateItem } from '../../../../src/actions/publicActions.ts';
import { createItemBuilder } from '../../../../src/actions/actionCreators.ts';

describe('Data reducer', () => {
  const _id1 = '9406272b-46bb-4bf2-9e6f-902683bbcae0';
  const _id2 = '3f7e95fc-551a-426c-9d58-6df2633ea56f';
  const _id3 = 'adfdb758-2adb-43f5-8a67-c9186c109864';
  const initialState = new Map([
    [_id1, new ListItemModel({ localId: _id1, value: 'Make coffee' })],
    [_id2, new ListItemModel({ localId: _id2, value: 'Master React' })],
  ]);

  it('creates new item properly', () => {
    const expectedStoreState = new Map([
      [_id1, new ListItemModel({ localId: _id1, value: 'Make coffee' })],
      [_id2, new ListItemModel({ localId: _id2, value: 'Master React' })],
      [_id3, new ListItemModel({ localId: _id3, value: 'Make a sandwich' })],
    ]);
    const dummyItemGenerator = () => new ListItemModel({ localId: _id3, value: 'Make a sandwich' });
    const dummyCreateItem = createItemBuilder(dummyItemGenerator);

    const result = data(initialState, dummyCreateItem('Make a sandwich'));

    expect(result).toEqual(expectedStoreState);
  });

  it('updates item properly', () => {
    const expectedStoreState = new Map([
      [_id1, new ListItemModel({ localId: _id1, value: 'Do stuff' })],
      [_id2, new ListItemModel({ localId: _id2, value: 'Master React' })],
    ]);

    const testStore = data(initialState, updateItem(_id1, 'Do stuff'));

    expect(testStore).toEqual(expectedStoreState);
  });

  it('deletes item properly', () => {
    const expectedStoreState = new Map([
      [_id2, new ListItemModel({ localId: _id2, value: 'Master React' })],
    ]);

    const testStore = data(initialState, deleteItem(_id1));

    expect(testStore).toEqual(expectedStoreState);
  });

  it('returns default state on wrong input correctly', () => {
    const resultState = data(undefined, deleteItem(_id1));

    expect(resultState).toEqual(new Map());
  });
});
