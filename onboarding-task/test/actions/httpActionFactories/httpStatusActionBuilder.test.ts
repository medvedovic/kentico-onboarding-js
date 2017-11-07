import {
  httpActionErrorFactory,
  httpActionSuccessFactory
} from '../../../src/actions/httpActionFactories/httpActionStatusFactories';
import { ListItemData } from '../../../src/models/ListItemData';
import { IAction } from '../../../src/actions/IAction';

const guid = '339dcff5-abfb-4b23-9757-633ec05a5a45';

describe('httpActionSuccessFactory', () => {
  const params = {
    id: '0ac3af95-2319-4692-9dc5-8bbc1a4d2564',
    value: 'Go home and do stuff'
  };
  it('builds new listItemData object on success', () => {
    const expectedResult: IAction = {
      type: 'GET',
      payload: {
        id: guid,
        item: new ListItemData({
          id: params.id,
          value: params.value,
        })
      }
    };

    const result = httpActionSuccessFactory('GET')(guid, params);

    expect(result).toEqual(expectedResult);
  });
});

describe('httpActionErrorFactory', () => {
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

    const testResult = httpActionErrorFactory('GET')(guid, new Error('failure'));

    expect(testResult).toEqual(expectedResult);
  });
});
