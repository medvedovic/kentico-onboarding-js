import 'isomorphic-fetch';
import { List, Map } from 'immutable';
import {
  postItemDataThunkFactory,
  repostRequestThunkFactory
} from '../../../src/actions/httpActionFactories/postDataThunkFactory';
import {
  IServerItemDataModel,
  toServerItemDataViewModel
} from '../../../src/models/IServerItemDataModel';
import {
  CREATE_ITEM,
  POST_ITEM_TO_SERVER
} from '../../../src/constants/actionTypes';
import { Store } from '../../../src/reducers/stores';
import { ListItemData } from '../../../src/models/ListItemData';
import { ListItemFlags } from '../../../src/models/ListItemFlags';
import { HttpAction } from '../../../src/constants/HttpAction';

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

const mockSuccessPost = (_url: string, _httpMethod: HttpAction, _itemDto?: IServerItemDataModel) => Promise.resolve(
  new Response(JSON.stringify({id, value: 'Go home'}))
);

const mockErrorPost = (_url: string, _httpMethod: HttpAction, _itemDto?: IServerItemDataModel) => Promise.reject(
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

const mockItemConverter = (value: string) => new ListItemData({
  id,
  value
});

const mockCreateItem = (item: ListItemData) => ({
  type: CREATE_ITEM,
  payload:  {
    item
  }
});


describe('postDataThunkFactory', () => {
  it('returns correct actions on success', async () => {
    const dependencies = {
      postItem: mockSuccessPost,
      onSuccess: onPostSuccess,
      onError: onPostError,
      createItem: mockItemConverter,
      onItemCreated: mockCreateItem,
      transformDataToDto: toServerItemDataViewModel,
      apiEndpoint: ''
    };
    const createItemExpectedResult = {
      type: CREATE_ITEM,
      payload: {
        item: new ListItemData({id, value: 'Go home'})
      }
    };
    const postExpectedResult = {
      type: POST_ITEM_TO_SERVER.SUCCESS,
      payload: {id, value: 'Go home'}
    };
    const postItemAsync = postItemDataThunkFactory(dependencies)('Go home');

    await postItemAsync(dispatch);

    expect(dispatch).toHaveBeenCalledWith(postExpectedResult);
    expect(dispatch).toHaveBeenCalledWith(createItemExpectedResult);
  });

  it('returns correct actions on failure', async () => {
    const dependencies = {
      postItem: mockErrorPost,
      onSuccess: onPostSuccess,
      onError: onPostError,
      createItem: mockItemConverter,
      onItemCreated: mockCreateItem,
      transformDataToDto: toServerItemDataViewModel,
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
        item: new ListItemData({id, value: 'Do stuff'})
      }
    };
    const postItemAsync = postItemDataThunkFactory(dependencies)('Do stuff');

    await postItemAsync(dispatch);

    expect(dispatch).toBeCalledWith(createItemExpectedResult);
    expect(dispatch).toBeCalledWith(postExpectedResult);
  });
});

describe('repostData', () => {
  it('returns correct actions on success', async () => {
    const dependencies = {
      postItem: mockSuccessPost,
      onSuccess: onPostSuccess,
      onError: onPostError,
      transformDataToDto: toServerItemDataViewModel,
      apiEndpoint: ''
    };
    const postExpectedResult = {
      type: POST_ITEM_TO_SERVER.SUCCESS,
      payload: {id, value: 'Go home'}
    };

    const repostItemAsync = repostRequestThunkFactory(dependencies)(id);

    await repostItemAsync(dispatch, getState);

    expect(dispatch).toBeCalledWith(postExpectedResult);
  });

  it('returns correct actions on failure', async () => {
    const dependencies = {
      postItem: mockErrorPost,
      onSuccess: onPostSuccess,
      onError: onPostError,
      transformDataToDto: toServerItemDataViewModel,
      apiEndpoint: ''
    };
    const postExpectedResult = {
      type: POST_ITEM_TO_SERVER.FAILURE,
      payload: {
        error: new Error('Something went wrong')
      }
    };

    const repostItemAsync = repostRequestThunkFactory(dependencies)(id);

    await repostItemAsync(dispatch, getState);

    expect(dispatch).toBeCalledWith(postExpectedResult);
  });
});
