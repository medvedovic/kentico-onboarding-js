import { fetchDataThunkFactory } from '../../../src/actions/httpActionFactories/fetchDataThunkFactory';
import { FETCH_DATA } from '../../../src/constants/actionTypes';
import {
  fetchHasFailed,
  fetchIsLoading
} from '../../../src/actions/actionCreators';
import { HttpAction } from '../../../src/constants/HttpAction';
import { ListItemData } from '../../../src/models/ListItemData';


const dispatch = jest.fn();
const items = [
  new ListItemData({ id: '1', value: 'Do stuff' }),
  new ListItemData({ id: '2', value: 'Go Home' })
];
const mockSuccessPromise = (_url: string) => Promise.resolve(
  new Response(JSON.stringify(items))
);
const mockErrorPromise = (_url: string) => Promise.reject(
  new Error('Some nasty shit happened')
);

const onFetchSucceeded = (input: Array<ListItemData>) => ({
  type: FETCH_DATA.HAS_SUCCEEDED,
  payload: {
    items: input
  }
});
const onFetchFailed = (error: Error) => fetchHasFailed(error);
const convertItem = (value: string, id: string) =>
  new ListItemData({
    id,
    value,
  });

describe('fetchDataThunkFactory', () => {
  it('dispatches correct actions on success', async () => {
    const dependencies = {
      sendRequest: mockSuccessPromise,
      convertItem,
      fetchIsLoading,
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
      sendRequest: mockErrorPromise,
      convertItem,
      fetchIsLoading,
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
