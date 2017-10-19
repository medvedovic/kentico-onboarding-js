import { httpStatusActionBuilder } from '../../../src/actions/httpActionFactories/httpStatusActionBuilder';
import { EHttpActionStatus } from '../../../src/constants/actionTypes';
import { ListItemData } from '../../../src/models/ListItemData';
import { IAction } from '../../../src/actions/IAction';

const guid = '339dcff5-abfb-4b23-9757-633ec05a5a45';

describe('httpStatusActionBuilder', () => {
  const params = {
    id: '0ac3af95-2319-4692-9dc5-8bbc1a4d2564',
    value: 'Go home and do stuff'
  };
  it('builds new listItemData object on success', () => {
    const expectedResult: IAction = {
      type: 'GET',
      status: EHttpActionStatus.success,
      payload: {
        item: new ListItemData({
          id: params.id,
          value: params.value,
          localId: guid
        })
      }
    };

    const result = httpStatusActionBuilder('GET', EHttpActionStatus.success)(guid, params);

    expect(result).toEqual(expectedResult);
  });

  it('builds new error message on failure', () => {
    const expectedResult: IAction = {
      type: 'GET',
      status: EHttpActionStatus.error,
      payload: {
        error: new Error('failure'),
        item: {
          localId: guid
        }
      }
    };

    const testResult = httpStatusActionBuilder('GET', EHttpActionStatus.error)(guid, new Error('failure'));

    expect(testResult).toEqual(expectedResult);
  });
});
