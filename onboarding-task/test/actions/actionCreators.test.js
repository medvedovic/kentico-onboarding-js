import { ListItemData } from '../../src/models/ListItemData.ts';
import {
  createItemBuilder,
  fetchIsLoading,
  fetchHasFailed,
  fetchHasSucceededBuilder,
} from '../../src/actions/actionCreators.ts';
import {
  FetchData,
  LocalItemActions,
} from '../../src/constants/actionTypes.ts';


describe('createItemBuilder', () => {
  it('builds createItem action properly', () => {
    const expectedAction = {
      type: LocalItemActions.CREATE_ITEM,
      payload: {
        item: new ListItemData({
          id: 'xxyy',
          value: 'Make a sandwich',
        }),
      },
    };
    const dummyFactory = (value) => new ListItemData({
      id: 'xxyy',
      value,
    });

    const testAction = createItemBuilder(dummyFactory)('Make a sandwich');

    expect(testAction).toEqual(expectedAction);
  });
});

describe('fetchIsLoading', () => {
  it('returns correctly built action', () => {
    const expectedResult = {
      type: FetchData.IS_LOADING,
      payload: {
        isLoading: true,
      },
    };

    const testResult = fetchIsLoading(true)();

    expect(testResult).toEqual(expectedResult);
  });
});

describe('fetchHasFailed', () => {
  it('returns correctly built action', () => {
    const expectedResult = {
      type: FetchData.HAS_FAILED,
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
      type: FetchData.HAS_SUCCEEDED,
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
