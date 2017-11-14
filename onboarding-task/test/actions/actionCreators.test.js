import { ListItemData } from '../../src/models/ListItemData.ts';
import { createItem } from '../../src/actions/httpActionFactories/postDataThunkFactory.ts';
import {
  fetchIsLoading,
  fetchHasFailed,
  fetchHasSucceededBuilder } from '../../src/actions/httpActionFactories/fetchDataThunkFactory.ts';
import {
  FETCH_DATA,
  CREATE_ITEM,
} from '../../src/constants/actionTypes.ts';


describe('createItem', () => {
  it('creates correct action', () => {
    const expectedAction = {
      type: CREATE_ITEM,
      payload: {
        item: new ListItemData({
          id: 'xxyy',
          value: 'Make a sandwich',
        }),
      },
    };
    const testAction = createItem(new ListItemData({
      id: 'xxyy',
      value: 'Make a sandwich',
    }));

    expect(testAction).toEqual(expectedAction);
  });
});

describe('fetchIsLoading', () => {
  it('returns correctly built action', () => {
    const expectedResult = {
      type: FETCH_DATA.IS_LOADING,
      payload: undefined,
    };

    const testResult = fetchIsLoading();

    expect(testResult).toEqual(expectedResult);
  });
});

describe('fetchHasFailed', () => {
  it('returns correctly built action', () => {
    const expectedResult = {
      type: FETCH_DATA.HAS_FAILED,
      payload: {
        error: new Error('failure'),
      },
    };

    const testResult = fetchHasFailed(new Error('failure'));

    expect(testResult).toEqual(expectedResult);
  });
});

describe('fetchHasSucceededBuilder', () => {
  const mockItemFactory = (value, id) => ListItemData({ value, id });
  const mockPayload = [
    { id: '21ed6482-b58e-4175-8130-e20dff01cf79', value: 'Go home' },
    { id: '7b017282-2d9a-45ba-9708-7a70b41a1992', value: 'Do stuff' },
  ];
  it('returns correct collection', () => {
    const expectedResult = {
      type: FETCH_DATA.HAS_SUCCEEDED,
      payload: {
        items: [
          ListItemData({
            id: '21ed6482-b58e-4175-8130-e20dff01cf79',
            value: 'Go home',
          }),
          ListItemData({
            id: '7b017282-2d9a-45ba-9708-7a70b41a1992',
            value: 'Do stuff',
          }),
        ],
      },
    };

    const testResult = fetchHasSucceededBuilder(mockItemFactory)(mockPayload);

    expect(testResult).toEqual(expectedResult);
  });
});
