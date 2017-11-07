import { fetchDataActionFactory } from '../../../src/actions/httpActionFactories/fetchDataActionFactory';
import { FetchData } from '../../../src/constants/actionTypes';
import { IServerItemDataModel } from '../../../src/models/IServerItemDataModel';
import {
  fetchHasFailed,
  fetchIsLoading
} from '../../../src/actions/actionCreators';


const dispatch = jest.fn();
const items = [
  { 'id': 1, 'value': 'Do stuff' },
  { 'id': 2, 'value': 'Go Home' }
];
const mockSuccessPromise = (_url: string) => Promise.resolve(
  new Response(JSON.stringify(items)).json()
);
const mockErrorPromise = (_url: string) => Promise.reject(
  new Error('Some nasty shit happened')
);

const onFetchSucceeded = (input: Array<IServerItemDataModel>) => ({
  type: FetchData.HAS_SUCCEEDED,
  payload: {
    items: input
  }
});
const onFetchFailed = (error: Error) => fetchHasFailed(error);


describe('fetchDataActionFactory', () => {
  it('dispatches correct actions on success', async () => {
    const dependencies = {
      fetchOperation: mockSuccessPromise,
      startLoader: fetchIsLoading,
      onFetchSucceeded,
      onFetchFailed,
      apiEndpoint: ''
    };
    const expectedActions = [
      { type: FetchData.IS_LOADING },
      { type: FetchData.HAS_SUCCEEDED, payload: { items } }
    ];

    const fetchDataAsync = fetchDataActionFactory(dependencies)();

    await fetchDataAsync(dispatch);

    expect(dispatch).toBeCalledWith(expectedActions[0]);
    expect(dispatch).toBeCalledWith(expectedActions[1]);
  });

  it('dispatches correct actions on failure', async () => {
    const dependencies = {
      fetchOperation: mockErrorPromise,
      startLoader: fetchIsLoading,
      onFetchSucceeded,
      onFetchFailed,
      apiEndpoint: ''
    };

    const expectedActions = [
      { type: FetchData.IS_LOADING },
      { type: FetchData.HAS_FAILED, payload: { error: new Error('Some nasty shit happened') } }
    ];

    const fetchDataAsync = fetchDataActionFactory(dependencies)();

    await fetchDataAsync(dispatch);

    expect(dispatch).toBeCalledWith(expectedActions[0]);
    expect(dispatch).toBeCalledWith(expectedActions[1]);
  });
});
