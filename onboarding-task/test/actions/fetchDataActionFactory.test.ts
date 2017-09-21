import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { fetchDataActionFactory } from '../../src/actions/fetchDataActionFactory';
import { Promise } from 'es6-promise';
import { FetchData } from '../../src/constants/actionTypes';
import { IItemDataDTO } from '../../src/models/ItemDataDTO';
import { fetchHasFailed } from '../../src/actions/fetchActions';
import {
  fetchStartLoading,
  fetchStopLoading
} from '../../src/actions/publicActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const items = [
  { 'id': 1, 'value': 'Do stuff' },
  { 'id': 2, 'value': 'Go Home' }
];
const mockSuccessPromise = (url: string) => Promise.resolve(
  new Response(JSON.stringify(items))
);
const mockErrorPromise = (url: string) => Promise.reject(
  new Error('Some nasty shit happened')
);
const startLoader = () => fetchStartLoading();
const stopLoader = () => fetchStopLoading();
const onFetchSucceeded = (input: Array<IItemDataDTO>) => ({
  type: FetchData.HAS_SUCCEEDED,
  payload: {
    items: input
  }
});
const onFetchFailed = (error: Error) => fetchHasFailed(error);

describe('fetchDataActionFactory', () => {
  it('dispatches correct actions', () => {
    const dependencies = {
      fetchOperation: mockSuccessPromise,
      startLoader,
      stopLoader,
      onFetchSucceeded,
      onFetchFailed,
    };
    const store = mockStore({});
    const expectedResult = [
      { type: 'IS_LOADING', payload: { isLoading: true } },
      { type: 'HAS_SUCCEEDED', payload: { items } },
      { type: 'IS_LOADING', payload: { isLoading: false } }
    ];

    return store.dispatch(fetchDataActionFactory(dependencies)(''))
      .then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedResult);
      });
  });

  it('does stuff', () => {
    const dependencies = {
      fetchOperation: mockErrorPromise,
      startLoader,
      stopLoader,
      onFetchSucceeded,
      onFetchFailed,
    };
    const store = mockStore({});
    const expectedResult = [
      { type: 'IS_LOADING', payload: { isLoading: true } },
      {
        type: 'HAS_FAILED', payload: {
        error: new Error('Some nasty shit happened')
      }
      },
      { type: 'IS_LOADING', payload: { isLoading: false } }
    ];

    return store.dispatch(fetchDataActionFactory(dependencies)(''))
      .then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedResult);
      });
  });
});
