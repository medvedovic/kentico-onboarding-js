import 'isomorphic-fetch';
import {
  IServerItemDataModel,
  toServerItemDataViewModel
} from '../../../src/models/IServerItemDataModel';
import {
  PUT_ITEM_TO_SERVER, UPDATE_ITEM,
} from '../../../src/constants/actionTypes';
import {
  List,
  Map
} from 'immutable';
import { putDataThunkFactory } from '../../../src/actions/httpActionFactories/putDataThunkFactory';
import { ListItemData } from '../../../src/models/ListItemData';
import { ListItemFlags } from '../../../src/models/ListItemFlags';
import { Store } from '../../../src/reducers/stores';
import { reputItemThunkFactory } from '../../../src/actions/httpActionFactories/putDataThunkFactory';
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
const mockPutSuccess = (_url: string, _httpMethod: HttpAction, _dto: IServerItemDataModel) => Promise.resolve(
  new Response(JSON.stringify({ id, value: 'Go home' }))
);
const mockPutError = (_url: string, _httpMethod: HttpAction, _dto: IServerItemDataModel) => Promise.reject(
  new Error('Some nasty shit happened')
);
const onPutSuccess = (_response: IServerItemDataModel) => ({
  type: PUT_ITEM_TO_SERVER.SUCCESS,
  payload: undefined
});
const onPutError = (_localId: string, _response: Error) => ({
  type: PUT_ITEM_TO_SERVER.FAILURE,
  payload: _response
});
const updateItemOperation = (localId: string, value: string) => ({
  type: UPDATE_ITEM,
  payload: {
    localId,
    value
  }
});


describe('putDataThunkFactory', () => {
  const updateResult = {
    type: UPDATE_ITEM,
    payload: {
      localId: id,
      value: 'Go home'
    }
  };
  it('returns correct actions on success', async () => {
    const dependencies = {
      sendRequest: mockPutSuccess,
      onSuccess: onPutSuccess,
      onError: onPutError,
      updateItem: updateItemOperation,
      transformDataToDto: toServerItemDataViewModel,
      apiEndpoint: ''
    };
    const putSuccessResult = {
      type: PUT_ITEM_TO_SERVER.SUCCESS,
      payload: undefined
    };

    const putItemAsync = putDataThunkFactory(dependencies)(id, 'Go home');

    await putItemAsync(dispatch, getState);

    expect(dispatch).toBeCalledWith(putSuccessResult);
    expect(dispatch).toBeCalledWith(updateResult);
  });

  it('returns correct actions on failure', async () => {
    const dependencies = {
      sendRequest: mockPutError,
      onSuccess: onPutSuccess,
      onError: onPutError,
      updateItem: updateItemOperation,
      transformDataToDto: toServerItemDataViewModel,
      apiEndpoint: ''
    };
    const expectedResult = {
      type: PUT_ITEM_TO_SERVER.FAILURE,
      payload: new Error('Some nasty shit happened')
    };

    const putItemAsync = putDataThunkFactory(dependencies)(id, 'Go home');

    await putItemAsync(dispatch, getState);

    expect(dispatch).toBeCalledWith(expectedResult);
    expect(dispatch).toBeCalledWith(updateResult);
  });
});

describe('reput item', () => {
  it('returns correct actions on success', async () => {
    const dependencies = {
      sendRequest: mockPutSuccess,
      onSuccess: onPutSuccess,
      onError: onPutError,
      transformDataToDto: toServerItemDataViewModel,
      apiEndpoint: ''
    };
    const expectedResult = {
      type: PUT_ITEM_TO_SERVER.SUCCESS,
      payload: undefined
    };

    const reputDataAsync = reputItemThunkFactory(dependencies)(id);

    await reputDataAsync(dispatch, getState);

    expect(dispatch).toBeCalledWith(expectedResult);
  });

  it('returns correct actions on failure', async () => {
    const dependencies = {
      sendRequest: mockPutError,
      onSuccess: onPutSuccess,
      onError: onPutError,
      transformDataToDto: toServerItemDataViewModel,
      apiEndpoint: ''
    };
    const expectedResult = {
      type: PUT_ITEM_TO_SERVER.FAILURE,
      payload: new Error('Some nasty shit happened')
    };
    const reputItemAsync = reputItemThunkFactory(dependencies)(id);

    await reputItemAsync(dispatch, getState);

    expect(dispatch).toBeCalledWith(expectedResult);
  });
});
