import {
  fetchDataThunkFactory,
  fetchIsLoading,
  fetchHasFailed,
} from '../../../src/actions/httpActionFactories/fetchDataThunkFactory';
import { FETCH_DATA } from '../../../src/constants/actionTypes';
import { IServerItemDataModel } from '../../../src/models/IServerItemDataModel';

import { HttpAction } from '../../../src/constants/HttpAction';


const dispatch = jest.fn();
const items = [
  { 'id': 1, 'value': 'Do stuff' },
  { 'id': 2, 'value': 'Go Home' }
];
const mockSuccessPromise = (_url: string) => Promise.resolve(
  new Response(JSON.stringify(items))
);
const mockErrorPromise = (_url: string) => Promise.reject(
  new Error('Some nasty shit happened')
);

const onFetchSucceeded = (input: Array<IServerItemDataModel>) => ({
  type: FETCH_DATA.HAS_SUCCEEDED,
  payload: {
    items: input
  }
});
const onFetchFailed = (error: Error) => fetchHasFailed(error);


describe('fetchDataThunkFactory', () => {
  it('dispatches correct actions on success', async () => {
    const dependencies = {
      fetchOperation: mockSuccessPromise,
      fetchIsLoading: fetchIsLoading,
      onFetchSucceeded,
      onFetchFailed,
      httpMethod: HttpAction.GET,
      apiEndpoint: ''
    };
    const expectedActions = [
      { type: FETCH_DATA.IS_LOADING },
      { type: FETCH_DATA.HAS_SUCCEEDED, payload: { items } }
    ];

    const fetchDataAsync = fetchDataThunkFactory(dependencies)();

    await fetchDataAsync(dispatch);

    expect(dispatch).toBeCalledWith(expectedActions[0]);
    expect(dispatch).toBeCalledWith(expectedActions[1]);
  });

  it('dispatches correct actions on failure', async () => {
    const dependencies = {
      fetchOperation: mockErrorPromise,
      fetchIsLoading: fetchIsLoading,
      onFetchSucceeded,
      onFetchFailed,
      httpMethod: HttpAction.GET,
      apiEndpoint: ''
    };

    const expectedActions = [
      { type: FETCH_DATA.IS_LOADING },
      { type: FETCH_DATA.HAS_FAILED, payload: { error: new Error('Some nasty shit happened') } }
    ];

    const fetchDataAsync = fetchDataThunkFactory(dependencies)();

    await fetchDataAsync(dispatch);

    expect(dispatch).toBeCalledWith(expectedActions[0]);
    expect(dispatch).toBeCalledWith(expectedActions[1]);
  });
});
