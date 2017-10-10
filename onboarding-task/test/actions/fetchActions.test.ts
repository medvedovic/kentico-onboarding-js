import {
  fetchHasFailed,
  fetchHasSucceededBuilder,
  fetchIsLoading
} from '../../src/actions/httpActionFactories/fetchDataActionCreators';
import { ListItemData } from '../../src/models/ListItemData';
import {
  EHttpActionStatus,
  FetchData
} from '../../src/constants/actionTypes';
import { httpStatusActionBuilder } from '../../src/actions/httpActionFactories/httpStatusActionBuilder';

describe('Fetch is loading', () => {
  it('Constructs action correctly', () => {
    const expectedResult = {
      type: FetchData.IS_LOADING,
      payload: {
        isLoading: true
      }
    };

    const action = fetchIsLoading(true)();

    expect(action).toEqual(expectedResult);
  });
});

describe('Fetch Has Failed', () => {
  it('Constructs action correctly', () => {
    const error = new Error('Nasty shit happened');
    const expectedResult = {
      type: FetchData.HAS_FAILED,
      payload: {
       error
      }
    };

    const result = fetchHasFailed(error);

    expect(result).toEqual(expectedResult);
  });
});

const mockFactory = (value: string, id: string) =>
  new ListItemData({
    id,
    value,
  });

describe('Fetch Has Succeeded Builder', () => {
  it('Does returns correct payload and type', () => {
    const input = {
      id: '00000000-0000-0000-0000-000000000000',
      value: 'Go home'
    };
    const fetchHasSucceeded = fetchHasSucceededBuilder(mockFactory);
    const expectedResult = {
      type: FetchData.HAS_SUCCEEDED,
      payload: {
        items: [
          mockFactory(input.value, input.id),
        ]
      }
    };

    const result = fetchHasSucceeded([input]);

    expect(result).toEqual(expectedResult);
  });
});

describe('Fetch Action Builder Composed', () => {
  it('Constructs success action correctly', () => {
    const expectedResult = {
      type: 'POST',
      status: EHttpActionStatus.success,
      payload: {
        item: new ListItemData({
          id: '00000000-0000-0000-0000-000000000000',
          value: 'Go home',
          localId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
        })
      }
    };
    const fetchSucceeded = httpStatusActionBuilder('POST', EHttpActionStatus.success);

    const result = fetchSucceeded('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', { value: 'Go home', id: '00000000-0000-0000-0000-000000000000' });

    expect(result).toEqual(expectedResult);
  });

  it('Constructs error action correctly', () => {
    const error = new Error('Nasty shit happened');
    const expectedResult = {
      type: 'POST',
      status: EHttpActionStatus.error,
      payload: {
        error,
        item: {
          localId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
        }
      }
    };
    const fetchSucceeded = httpStatusActionBuilder('POST', EHttpActionStatus.error);

    const result = fetchSucceeded('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', error);

    expect(result).toEqual(expectedResult);
  });
});
