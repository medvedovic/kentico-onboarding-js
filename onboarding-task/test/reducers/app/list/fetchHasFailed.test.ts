import { fetchHasFailed } from '../../../../src/reducers/app/list/fetchHasFailed';
import { FETCH_DATA } from '../../../../src/constants/actionTypes';

describe('fetchHasFailed', () => {
  it('returns true on fetch has succeeded', () => {
    const action = {
      type: FETCH_DATA.HAS_SUCCEEDED,
      payload: undefined
    };

    const result = fetchHasFailed(false, action);

    expect(result).toBeFalsy();
  });

  it('returns false on fetch has failed', () => {
    const action = {
      type: FETCH_DATA.HAS_FAILED,
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
