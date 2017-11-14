import { List } from 'immutable';
import { ids } from '../../src/reducers/items/ids';
import { deleteItem } from '../../src/actions/publicActions';
import { ListItemData } from '../../src/models/ListItemData';
import { createItem } from '../../src/actions/actionCreators';
import {
  FETCH_DATA,
  POST_ITEM_TO_SERVER
} from '../../src/constants/actionTypes';

describe('idsReducer', () => {
  const id = 'adfdb758-2adb-43f5-8a67-c9186c109864';
  const id2 = '436c6cf0-7f50-4e15-a89a-5fc2a87ea607';

  it('returns new state on create properly', () => {
    const initialState = new List();
    const expectedState = initialState.push(id);
    const createItemAction = createItem(new ListItemData({ id }));

    const test = ids(initialState, createItemAction);

    expect(test).toEqual(expectedState);
  });

  it('returns new state on delete properly', () => {
    const initialState = new List([id]);

    const test = ids(initialState, deleteItem(id));

    expect(test.size).toEqual(0);
  });

  it('returns correct state on post item to server success', () => {
    const initialState = new List([id2]);
    const action = {
      type: POST_ITEM_TO_SERVER.SUCCESS,
      payload: {
        id: id2,
        item: {
          id
        }
      }
    };

    const test = ids(initialState, action);

    expect(test).toContain(id);
    expect(test).not.toContain(id2);
  });

  it('returns correct state on FetchData.HAS_SUCCEEDED', () => {
    const initialState = new List();
    const action = {
      type: FETCH_DATA.HAS_SUCCEEDED,
      payload: {
        items: [
          { id },
          { id: id2 }
        ]
      }
    };

    const test = ids(initialState, action);

    expect(test).toContain(id);
    expect(test).toContain(id2);
  });

  it('returns default state', () => {
    const initialState = new List([id, id2]);

    let test = ids(initialState, {});

    expect(test).toBe(initialState);
  });
});
