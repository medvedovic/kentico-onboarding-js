import 'isomorphic-fetch';
import { IServerItemDataModel } from '../../../src/models/IServerItemDataModel';
import { LocalItemActions, } from '../../../src/constants/actionTypes';
import {
  List,
  Map
} from 'immutable';
import { putDataActionFactory } from '../../../src/actions/httpActionFactories/putDataActionFactory';
import { ListItemData } from '../../../src/models/ListItemData';
import { HttpActionStatus } from '../../../src/constants/HttpActionStatus';
import { HttpAction } from '../../../src/constants/HttpAction';
import { ListItemFlags } from '../../../src/models/ListItemFlags';
import { Store } from '../../../src/reducers/stores';
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
const mockPutSuccess = (_url: string, _dto: IServerItemDataModel) => Promise.resolve(
  new Response(JSON.stringify({ id, value: 'Go home' }))
);
const mockPutError = (_url: string, _dto: IServerItemDataModel) => Promise.reject(
  new Error('Some nasty shit happened')
);
const onPutSuccess = (_localId: string, _response: IServerItemDataModel) => ({
  type: HttpAction.PUT,
  status: HttpActionStatus.success,
  payload: undefined
});
const onPutError = (_localId: string, _response: Error) => ({
  type: HttpAction.PUT,
  status: HttpActionStatus.error,
  payload: _response
});
const updateItemOperation = (localId: string, value: string) => ({
  type: LocalItemActions.UPDATE_ITEM,
  payload: {
    localId,
    value
  }
});


describe('putDataActionFactory', () => {
  const updateResult = {
    type: LocalItemActions.UPDATE_ITEM,
    payload: {
      localId: id,
      value: 'Go home'
    }
  };
  it('returns correct actions on success', async () => {
    const dependencies = {
      operation: mockPutSuccess,
      onSuccess: onPutSuccess,
      onError: onPutError,
      updateItemOperation,
      apiEndpoint: ''
    };
    const putSuccessResult = {
      type: HttpAction.PUT,
      status: HttpActionStatus.success,
      payload: undefined
    };

    const putItemAsync = putDataActionFactory(dependencies)(id, 'Go home');

    await putItemAsync(dispatch, getState);

    expect(dispatch).toBeCalledWith(putSuccessResult);
    expect(dispatch).toBeCalledWith(updateResult);
  });

  it('returns correct actions on failure', async () => {
    const dependencies = {
      operation: mockPutError,
      onSuccess: onPutSuccess,
      onError: onPutError,
      updateItemOperation,
      apiEndpoint: ''
    };
    const expectedResult = {
      type: HttpAction.PUT,
      status: HttpActionStatus.error,
      payload: new Error('Some nasty shit happened')
    };

    const putItemAsync = putDataActionFactory(dependencies)(id, 'Go home');

    await putItemAsync(dispatch, getState);

    expect(dispatch).toBeCalledWith(expectedResult);
    expect(dispatch).toBeCalledWith(updateResult);
  });
});

describe('reput item', () => {
  it('returns correct actions on success', async () => {
    const dependencies = {
      operation: mockPutSuccess,
      onSuccess: onPutSuccess,
      onError: onPutError,
      apiEndpoint: ''
    };
    const expectedResult = {
      type: HttpAction.PUT,
      status: HttpActionStatus.success,
      payload: undefined
    };

    const reputDataAsync = redoRequestToServerFactory({ ...dependencies })(id);

    await reputDataAsync(dispatch, getState);

    expect(dispatch).toBeCalledWith(expectedResult);
  });

  it('returns correct actions on failure', async () => {
    const dependencies = {
      operation: mockPutError,
      onSuccess: onPutSuccess,
      onError: onPutError,
      apiEndpoint: ''
    };
    const expectedResult = {
      type: HttpAction.PUT,
      status: HttpActionStatus.error,
      payload: new Error('Some nasty shit happened')
    };
    const reputItemAsync = redoRequestToServerFactory({ ...dependencies })(id);

    await reputItemAsync(dispatch, getState);

    expect(dispatch).toBeCalledWith(expectedResult);
  });
});
