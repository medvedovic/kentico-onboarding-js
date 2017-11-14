import { Map } from 'immutable';
import { flags } from '../../../../src/reducers/items/flags/flags.ts';
import { toggleBeingEdited } from '../../../../src/actions/publicActions.ts';
import { deleteItem } from '../../../../src/actions/httpActionFactories/deleteItemThunkFactory.ts';
import { createItem } from '../../../../src/actions/httpActionFactories/postDataThunkFactory.ts';
import { fetchHasSucceededBuilder } from '../../../../src/actions/httpActionFactories/fetchDataThunkFactory.ts';
import { ListItemFlags } from '../../../../src/models/ListItemFlags.ts';
import { ListItemData } from '../../../../src/models/ListItemData.ts';
import {
  POST_ITEM_TO_SERVER,
  PUT_ITEM_TO_SERVER,
  DELETE_ITEM_AT_SERVER_FAILURE
} from '../../../../src/constants/actionTypes';

describe('flagsReducer', () => {
  const id1 = 'e9082417-eae0-4b00-a2d0-5722ba3b1641';
  const id2 = '946ca2ad-a77f-4f8b-8b58-7e40de6f7ba5';
  const initialState = new Map([
    [id1, new ListItemFlags()],
    [id2, new ListItemFlags()],
  ]);

  it('toggles flags correctly', () => {
    const expectedResult = new Map([
      [id1, new ListItemFlags()],
      [id2, new ListItemFlags({
        isBeingEdited: true,
      })],
    ]);

    const result = flags(initialState, toggleBeingEdited(id2));

    expect(result).toEqual(expectedResult);
    expect(result).not.toBe(expectedResult);
  });

  it('returns correct state on post item to server success',() => {
    const id = '9cf7f383-6ab2-45b7-b0a9-f2a091160d5f';
    const action = {
      type: POST_ITEM_TO_SERVER.SUCCESS,
      payload: {
        temporaryId: id2,
        item: {
          id
        }
      }
    };
    const expectedResult = new Map([
      [id1, new ListItemFlags()],
      [id, new ListItemFlags()],
    ]);

    const result = flags(initialState, action);

    expect(result).toEqual(expectedResult);
  });

  it('returns new state on create item properly', () => {
    const expectedResult = new Map([
      [id1, new ListItemFlags()],
      [id2, new ListItemFlags()],
      ['xxyyzz', new ListItemFlags()],
    ]);
    const createItemAction = createItem(new ListItemData({ id: 'xxyyzz' }));

    const result = flags(initialState, createItemAction);

    expect(result).toEqual(expectedResult);
  });

  it('sets flags correctly on actions failure',() => {
    const actionTypes = [
      POST_ITEM_TO_SERVER.FAILURE,
      PUT_ITEM_TO_SERVER.FAILURE,
      DELETE_ITEM_AT_SERVER_FAILURE
    ];
    actionTypes.forEach((actionType) => {
      const expectedResult = new Map([
        [id1, new ListItemFlags({
          isSavedSuccess: false,
          failedHttpAction: actionType
        })],
        [id2, new ListItemFlags()],
      ]);
      const action = {
        type: actionType,
        payload: {
          item: {
            id: id1
          }
        }
      };

      const result = flags(initialState, action);

      expect(result).toEqual(expectedResult);
    })
  });

  it('returns new state on delete item correctly', () => {
    const expectedResult = new Map([
      [id1, new ListItemFlags()],
    ]);
    const result = flags(initialState, deleteItem(id2));

    expect(result).toEqual(expectedResult);
  });

  it('creates new flags for items after fetch correctly', () => {
    const mockResponse = [
      { id: id1, value: 'Make coffee' },
      { id: id2, value: 'Master React' },
    ];
    const expectedStoreState = new Map([
      [id1, new ListItemFlags()],
      [id2, new ListItemFlags()],
    ]);

    const mockParse = (value, id) => new ListItemData({ id, value, localId: id });
    const fetch = fetchHasSucceededBuilder(mockParse)(mockResponse);

    const testResult = flags(undefined, fetch);

    expect(testResult).toEqual(expectedStoreState);
  });

  it('returns default state on wrong input', () => {
    const test = flags(undefined, {});

    expect(test).toEqual(new Map());
  });
});
