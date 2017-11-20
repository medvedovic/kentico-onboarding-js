import { isLoading } from '../../../../src/reducers/app/list/isLoading';
import { FETCH_DATA } from '../../../../src/constants/actionTypes';

describe('isLoading', () => {
  it('returns true on fetch is loading', () => {
    const action = {
      type: FETCH_DATA.IS_LOADING,
      payload: undefined
    };

    const result = isLoading(false, action);

    expect(result).toBeTruthy();
  });

  it('returns false on fetch has succeeded', () => {
    const action = {
      type: FETCH_DATA.HAS_SUCCEEDED,
      payload: undefined
    };

    const result = isLoading(false, action);

    expect(result).toBeFalsy();
  });

  it('returns false on fetch has failed', () => {
    const action = {
      type: FETCH_DATA.HAS_FAILED,
      payload: undefined
    };

    const result = isLoading(false, action);

    expect(result).toBeFalsy();
  });

  it('returns default state', () => {
    const action = {
      type: '',
      payload: undefined
    };

    const result = isLoading(undefined, action);

    expect(result).toBeTruthy();
  });
});
