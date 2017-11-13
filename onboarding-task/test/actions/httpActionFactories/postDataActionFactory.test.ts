import 'isomorphic-fetch';
import { List, Map } from 'immutable';
import { postItemDataActionFactory } from '../../../src/actions/httpActionFactories/postDataActionFactory';
import { IServerItemDataModel } from '../../../src/models/IServerItemDataModel';
import {
  CREATE_ITEM,
  POST_ITEM_TO_SERVER
} from '../../../src/constants/actionTypes';
import { Store } from '../../../src/reducers/stores';
import { ListItemData } from '../../../src/models/ListItemData';
import { ListItemFlags } from '../../../src/models/ListItemFlags';
import { redoRequestToServerFactory } from '../../../src/actions/httpActionFactories/redoRequestToServerFactory';

const id = '62661d39-1c39-4b34-950e-5cb3b5a3ffad';
const dispatch = jest.fn().mockImplementation((a: any) => a);

const getState = (): Store.IRoot => ({
  items: {
    ids: List<string>([id]),
    data: Map<string, ListItemData>([[id, new ListItemData({
      id: id,
      value: 'Test like a fucking satan'
    })]]),
    flags: Map<string, ListItemFlags>()
  },
  app: {
    list: {
      fetchHasFailed: false,
      isLoading: false,
    }
  }
});

const mockSuccessPost = (_url: string) => Promise.resolve(
  new Response(JSON.stringify({id, value: 'Go home'})).json()
);

const mockErrorPost = (_url: string) => Promise.reject(
  new Error('Something went wrong')
);

const onPostSuccess = (_localId: string, _response: IServerItemDataModel) => ({
  type: POST_ITEM_TO_SERVER.SUCCESS,
  payload: {
    ..._response,
  }
});

const onPostError = (_localId: string, _response: Error) => ({
  type: POST_ITEM_TO_SERVER.FAILURE,
  payload: {
    error: _response,
  }
});

const mockCreateItem = (value: string) => ({
  type: CREATE_ITEM,
  payload: {
    item: {id, value}
  }
});


describe('postDataActionFactory', () => {
  it('returns correct actions on success', async () => {
    const dependencies = {
      operation: mockSuccessPost,
      onSuccess: onPostSuccess,
      onError: onPostError,
      createItemOperation: mockCreateItem,
      apiEndpoint: ''
    };
    const createItemExpectedResult = {
      type: CREATE_ITEM,
      payload: {
        item: {id, value: 'Go home'}
      }
    };
    const postExpectedResult = {
      type: POST_ITEM_TO_SERVER.SUCCESS,
      payload: {id, value: 'Go home'}
    };
    const postItemAsync = postItemDataActionFactory(dependencies)('Go home');

    await postItemAsync(dispatch);

    expect(dispatch).toBeCalledWith(createItemExpectedResult);
    expect(dispatch).toBeCalledWith(postExpectedResult);
  });

  it('returns correct actions on failure', async () => {
    const dependencies = {
      operation: mockErrorPost,
      onSuccess: onPostSuccess,
      onError: onPostError,
      createItemOperation: mockCreateItem,
      apiEndpoint: ''
    };
    const postExpectedResult = {
      type: POST_ITEM_TO_SERVER.FAILURE,
      payload: {
        error: new Error('Something went wrong'),
      }
    };
    const createItemExpectedResult = {
      type: CREATE_ITEM,
      payload: {
        item: {id, value: 'Do stuff'}
      }
    };
    const postItemAsync = postItemDataActionFactory(dependencies)('Do stuff');

    await postItemAsync(dispatch);

    expect(dispatch).toBeCalledWith(createItemExpectedResult);
    expect(dispatch).toBeCalledWith(postExpectedResult);
  });
});

describe('repostData', () => {
  it('returns correct actions on success', async () => {
    const dependencies = {
      operation: mockSuccessPost,
      onSuccess: onPostSuccess,
      onError: onPostError,
      apiEndpoint: ''
    };
    const postExpectedResult = {
      type: POST_ITEM_TO_SERVER.SUCCESS,
      payload: {id, value: 'Go home'}
    };

    const repostItemAsync = redoRequestToServerFactory({...dependencies})(id);

    await repostItemAsync(dispatch, getState);

    expect(dispatch).toBeCalledWith(postExpectedResult);
  });

  it('returns correct actions on failure', async () => {
    const dependencies = {
      operation: mockErrorPost,
      onSuccess: onPostSuccess,
      onError: onPostError,
      apiEndpoint: ''
    };
    const postExpectedResult = {
      type: POST_ITEM_TO_SERVER.FAILURE,
      payload: {
        error: new Error('Something went wrong')
      }
    };

    const repostItemAsync = redoRequestToServerFactory({...dependencies})(id);

    await repostItemAsync(dispatch, getState);

    expect(dispatch).toBeCalledWith(postExpectedResult);
  });
});
