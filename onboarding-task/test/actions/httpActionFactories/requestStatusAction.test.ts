import {
  requestHasFailed, postRequestHasSucceeded,
  requestHasSucceeded
} from '../../../src/actions/httpActionFactories/requestStatusActions';
import { ListItemData } from '../../../src/models/ListItemData';
import { IAction } from '../../../src/actions/IAction';
import { POST_ITEM_TO_SERVER } from '../../../src/constants/actionTypes';

const guid = '339dcff5-abfb-4b23-9757-633ec05a5a45';

describe('handleSuccessfulRequest', () => {
  const params = new ListItemData({
      id: '0ac3af95-2319-4692-9dc5-8bbc1a4d2564',
      value: 'Go home and do stuff'
    });
  it('builds new listItemData object on success', () => {
    const expectedResult: IAction = {
      type: 'GET',
      payload: {
        item: new ListItemData({
          id: params.id,
          value: params.value,
        })
      }
    };

    const result = requestHasSucceeded('GET')(params);

    expect(result).toEqual(expectedResult);
  });
});

describe('handleErrorRequest', () => {
  it('builds new error message on failure', () => {
    const expectedResult: IAction = {
      type: 'GET',
      payload: {
        error: new Error('failure'),
        item: {
          id: guid
        }
      }
    };

    const testResult = requestHasFailed('GET')(guid, new Error('failure'));

    expect(testResult).toEqual(expectedResult);
  });
});

describe('handleSuccessfulPost', () => {
  const params = {
    id: '0ac3af95-2319-4692-9dc5-8bbc1a4d2564',
    value: 'Go home and do stuff'
  };
  it('builds action correctly', () => {
    const expectedResult = {
      type: POST_ITEM_TO_SERVER.SUCCESS,
      payload: {
        temporaryId: guid,
        item: new ListItemData({
          ...params
        })
      }
    };

    const actualResult = postRequestHasSucceeded(guid, params);

    expect(actualResult).toEqual(expectedResult);
  })
});
