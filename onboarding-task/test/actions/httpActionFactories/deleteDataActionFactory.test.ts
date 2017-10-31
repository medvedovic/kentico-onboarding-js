import 'isomorphic-fetch';
import {
  List,
  Map
} from 'immutable';

import { deleteItemData } from '../../../src/actions/httpActionFactories/deleteDataActionFactory';
import {
  LocalItemActions
} from '../../../src/constants/actionTypes';
import { itemDataActionFactory } from '../../../src/actions/httpActionFactories/itemDataActionFactory';
import { EHttpActionStatus } from '../../../src/constants/EHttpActionStatus';
import { HttpAction } from '../../../src/constants/HttpAction';
import { ListItemData } from '../../../src/models/ListItemData';
import { ListItemFlags } from '../../../src/models/ListItemFlags';

import { Store } from '../../../src/reducers/stores';


const mockDeleteSuccess = (_url: string) => Promise.resolve(new Response());
const mockDeleteError = (_url: string) => Promise.reject('Error occurred');
const onDeleteError = (_localId: string, _response: Error) => ({
  type: HttpAction.DELETE,
  status: EHttpActionStatus.error,
  payload: 'Error occurred'
});
const onDeleteSuccess = (_localId: string) => ({
  type: LocalItemActions.DELETE_ITEM,
  payload: _localId
});
const id = '403f6867-b729-475b-9119-fa62c975a653';
const dispatch = jest.fn();
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
      showLoader: false,
    }
  }
});

describe('deleteDataActionFactory', () => {
  it('Returns correct actions on success', async () => {
    const dependencies = {
      operation: mockDeleteSuccess,
      onSuccess: onDeleteSuccess,
      onError: onDeleteError,
      apiEndpoint: ''
    };
    const expectedAction = [{
      type: LocalItemActions.DELETE_ITEM,
      payload: id
    }];
    const deleteItemAsync = itemDataActionFactory(deleteItemData, { ...dependencies })(id);

    await deleteItemAsync(dispatch, getState);

    expect(dispatch).toBeCalledWith(...expectedAction);
  });

  it('Dispatches correct action on failure', async () => {
    const dependencies = {
      operation: mockDeleteError,
      onSuccess: onDeleteSuccess,
      onError: onDeleteError,
      apiEndpoint: ''
    };
    const expectedActions = [{
      type: HttpAction.DELETE,
      status: EHttpActionStatus.error,
      payload: 'Error occurred'
    }];
    const deleteItemAsync = itemDataActionFactory(deleteItemData, { ...dependencies })(id);

    await deleteItemAsync(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(...expectedActions);
  });
});
