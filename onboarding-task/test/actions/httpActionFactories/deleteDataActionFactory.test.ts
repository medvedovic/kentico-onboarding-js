import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Promise } from 'es6-promise';
import { deleteDataActionFactoryCore } from '../../../src/actions/httpActionFactories/deleteDataActionFactory';
import {
  EHttpActionStatus,
  HttpAction,
  LocalItemActions
} from '../../../src/constants/actionTypes';
import { OrderedMap } from 'immutable';
import { itemDataActionFactory } from '../../../src/actions/httpActionFactories/itemDataActionFactory';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const localId = '1234';
const mockInitialState = () => ({
  items: {
    data: OrderedMap([[localId, { id: localId, value: 'Do stuff' }]])
  }
});

const mockDeleteSuccess = (_url: string) => Promise.resolve(
  new Response()
);
const mockDeleteError = (_url: string) => Promise.reject(
  'Error occurred'
);
const onDeleteError = (_localId: string, _response: Error) => ({
  type: HttpAction.DELETE,
  status: EHttpActionStatus.error,
  payload: 'Error occurred'
});
const onDeleteSuccess = (_localId: string) => ({
  type: LocalItemActions.DELETE_ITEM,
  payload: _localId
});


describe('deleteDataActionFactory', () => {
  it('returns correct actions on success', () => {
    const store = mockStore(mockInitialState());
    const dependencies = {
      operation: mockDeleteSuccess,
      onSuccess: onDeleteSuccess,
      onError: onDeleteError,
      apiEndpoint: ''
    };
    const expectedAction = {
      type: LocalItemActions.DELETE_ITEM,
      payload: '1234'
    };


    return store.dispatch(itemDataActionFactory(deleteDataActionFactoryCore, { ...dependencies })(localId))
      .then(() => {
        const actions = store.getActions();
        expect(actions).toContainEqual(expectedAction);
      });
  });

  it('returns correct actions on failure', () => {
    const store = mockStore(mockInitialState());
    const expectedAction = {
      type: HttpAction.DELETE,
      status: EHttpActionStatus.error,
      payload: 'Error occurred'
    };
    const dependencies = {
      operation: mockDeleteError,
      onSuccess: onDeleteSuccess,
      onError: onDeleteError,
      apiEndpoint: ''
    };


    return store.dispatch(itemDataActionFactory(deleteDataActionFactoryCore, { ...dependencies })(localId))
      .then(() => {
        const actions = store.getActions();
        expect(actions).toContainEqual(expectedAction);
      });
  });
});
