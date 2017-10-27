import { showLoader } from '../../../../src/reducers/app/list/showLoader';
import { FetchData } from '../../../../src/constants/actionTypes';

describe('fetchHasFailed', () => {
  it('returns true on fetch is loading', () => {
    const action = {
      type: FetchData.IS_LOADING,
      payload: undefined
    };

    const result = showLoader(false, action);

    expect(result).toBeTruthy();
  });

  it('returns false on fetch has succeeded', () => {
    const action = {
      type: FetchData.HAS_SUCCEEDED,
      payload: undefined
    };

    const result = showLoader(false, action);

    expect(result).toBeFalsy();
  });

  it('returns false on fetch has failed', () => {
    const action = {
      type: FetchData.HAS_FAILED,
      payload: undefined
    };

    const result = showLoader(false, action);

    expect(result).toBeFalsy();
  });

  it('returns default state', () => {
    const action = {
      type: '',
      payload: undefined
    };

    const result = showLoader(undefined, action);

    expect(result).toBeTruthy();
  });
});
