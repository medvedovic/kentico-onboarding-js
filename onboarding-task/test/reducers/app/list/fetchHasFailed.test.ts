import { fetchHasFailed } from '../../../../src/reducers/app/list/fetchHasFailed';
import { FetchData } from '../../../../src/constants/actionTypes';

describe('fetchHasFailed', () => {
  it('returns true on fetch has succeeded', () => {
    const action = {
      type: FetchData.HAS_SUCCEEDED,
      payload: undefined
    };

    const result = fetchHasFailed(false, action);

    expect(result).toBeFalsy();
  });

  it('returns false on fetch has failed', () => {
    const action = {
      type: FetchData.HAS_FAILED,
      payload: undefined
    };

    const result = fetchHasFailed(false, action);

    expect(result).toBeTruthy();
  });

  it('returns default value', () => {
    const action = {
      type: '',
      payload: undefined
    };

    const result = fetchHasFailed(undefined, action);

    expect(result).toBeFalsy();
  });
});
