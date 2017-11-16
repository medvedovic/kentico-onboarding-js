import { ListItemData as ListItemModel } from '../../../../src/models/ListItemData.ts';
import { Map } from 'immutable';
import { data } from '../../../../src/reducers/items/data/data.ts';
import {
  createItem,
  updateItem,
  deleteItem,
  fetchHasSucceeded
} from '../../../../src/actions/actionCreators.ts';
import { POST_ITEM_TO_SERVER } from '../../../../src/constants/actionTypes';

describe('dataReducer', () => {
  const _id1 = '9406272b-46bb-4bf2-9e6f-902683bbcae0';
  const _id2 = '3f7e95fc-551a-426c-9d58-6df2633ea56f';
  const _id3 = 'adfdb758-2adb-43f5-8a67-c9186c109864';
  const initialState = new Map([
    [
      _id1,
      new ListItemModel({
        id: _id1,
        value: 'Make coffee'
      })
    ],
    [
      _id2,
      new ListItemModel({
        id: _id2,
        value: 'Master React'
      })
    ],
  ]);

  it('creates new item properly', () => {
    const newListItem = new ListItemModel({
      id: _id3,
      value: 'Make a sandwich'
    });
    const expectedStoreState = initialState.set(_id3, newListItem);
    const createItemAction = createItem(newListItem);

    const result = data(initialState, createItemAction);

    expect(result).toEqual(expectedStoreState);
  });

  it('updates item properly', () => {
    const expectedStoreState = new Map([
      [
        _id1,
        new ListItemModel({
          id: _id1,
          value: 'Do stuff'
        })
      ],
      [
        _id2,
        new ListItemModel({
          id: _id2,
          value: 'Master React'
        })
      ],
    ]);

    const testStore = data(initialState, updateItem(_id1, 'Do stuff'));

    expect(testStore).toEqual(expectedStoreState);
  });

  it('deletes item properly', () => {
    const expectedStoreState = new Map([
      [
        _id2,
        new ListItemModel({
          id: _id2,
          value: 'Master React'
        })
      ],
    ]);

    const testStore = data(initialState, deleteItem(_id1));

    expect(testStore).toEqual(expectedStoreState);
  });

  it('returns default state', () => {
    const resultState = data(undefined, deleteItem(_id1));

    expect(resultState).toEqual(new Map());
  });

  it('stores new items from fetch correctly', () => {
    const mockResponse = [
      new ListItemModel({
        id: _id1,
        value: 'Make coffee'
      }),
      new ListItemModel({
        id: _id2,
        value: 'Master React'
      }),
    ];
    const expectedStoreState = new Map([
      [
        _id1,
        new ListItemModel({
          id: _id1,
          value: 'Make coffee'
        })
      ],
      [
        _id2,
        new ListItemModel({
          id: _id2,
          value: 'Master React'
        })
      ],
    ]);

    const fetch = fetchHasSucceeded(mockResponse);

    const testResult = data(undefined, fetch);

    expect(testResult).toEqual(expectedStoreState);
  });

  it('returns correct state on post item to server success', () => {
    const action = {
      type: POST_ITEM_TO_SERVER.SUCCESS,
      payload: {
        temporaryId: _id2,
        item: new ListItemModel({
          id: _id3,
          value: 'Master React'
        })
      }
    };
    const expectedResult = new Map([
      [
        _id1,
        new ListItemModel({
          id: _id1,
          value: 'Make coffee'
        })
      ],
      [
        _id3,
        new ListItemModel({
          id: _id3,
          value: 'Master React'
        })
      ],
    ]);

    const actualResult = data(initialState, action);

    expect(actualResult).toEqual(expectedResult);
  });

  it('does not modify state on unknown actions', () => {
    const result = data(initialState, {});

    expect(result).toEqual(initialState);
  });
});
