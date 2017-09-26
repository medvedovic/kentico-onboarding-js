import { settings } from '../../../src/reducers/app/settings';
import {
  fetchHasFailed} from '../../../src/actions/fetchActions';
import { AppSettings } from '../../../src/constants/AppSettings';
import { deleteItem } from '../../../src/actions/userActions';
import {
  fetchHasSucceeded,
  fetchStartLoading,
  fetchStopLoading
} from '../../../src/actions/actionCreators';

describe('Settings reducer', () => {

  it('Sets loader on correctly', () => {
    const initialState = new AppSettings();

    const result = settings(initialState, fetchStartLoading());

    expect(result.showLoader).toBeTruthy();
  });

  it('Stops loader', () => {
    const initialState = new AppSettings({
      showLoader: true,
    });

    const result = settings(initialState, fetchStopLoading());

    expect(result.showLoader).toBeFalsy();
  });

  it('Sets correct state on failure', () => {
    const initialState = new AppSettings();

    const result = settings(initialState, fetchHasFailed(new Error('Error message')));

    expect(result.fetchHasFailed).toBeTruthy();
  });

  it('Sets correct state on success', () => {
    const initialState = new AppSettings();

    const result = settings(initialState, fetchHasSucceeded([]));

    expect(result.fetchHasFailed).toBeFalsy();
  });

  it('Returns default state', () => {
    const expectedState = new AppSettings();

    const result = settings(undefined, deleteItem(''));

    expect(result).toEqual(expectedState);
  });
});
