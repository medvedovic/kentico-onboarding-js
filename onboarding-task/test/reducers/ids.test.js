import { List } from 'immutable';
import { ids } from '../../src/reducers/items/ids';
import { deleteItem } from '../../src/actions/publicActions';
import { ListItemData } from '../../src/models/ListItemData';
import { createItemBuilder } from '../../src/actions/actionCreators';

describe('Ids reducer', () => {
  const id = 'adfdb758-2adb-43f5-8a67-c9186c109864';

  it('returns new state on create properly', () => {
    const initialState = new List();
    const expectedState = initialState.push(id);
    const dummyFactory = () => new ListItemData({ localId: id });
    const dummyCreateItem = createItemBuilder(dummyFactory);

    const test = ids(initialState, dummyCreateItem(''));

    expect(test).toEqual(expectedState);
  });

  it('returns new state on delete properly', () => {
    const initialState = new List([id]);

    const test = ids(initialState, deleteItem(id));

    expect(test.size).toEqual(0);
  });

  it('return default state on wrong input correctly', () => {
    const test = ids(undefined, {});

    expect(test).toBe(new List());
  });
});
