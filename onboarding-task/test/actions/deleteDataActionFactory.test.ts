import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { deleteDataActionFactory } from '../../src/actions/deleteDataActionFactory';
import { Promise } from 'es6-promise';
import {
  EHttpActionStatus,
  HttpAction,
  LocalItemActions
} from '../../src/constants/actionTypes';
import { OrderedMap } from 'immutable';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const mockInitialState = () => ({
  items: {
    data: OrderedMap([['1234', { id: '1234', value: 'Do stuff' }]])
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
      deleteOperation: mockDeleteSuccess,
      onDeleteSuccess,
      onDeleteError,
      apiEndpoint: ''
    };
    const expectedAction = {
      type: LocalItemActions.DELETE_ITEM,
      payload: '1234'
    };


    return store.dispatch(deleteDataActionFactory(dependencies)('1234'))
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
      deleteOperation: mockDeleteError,
      onDeleteSuccess,
      onDeleteError,
      apiEndpoint: ''
    };


    return store.dispatch(deleteDataActionFactory(dependencies)('1234'))
      .then(() => {
        const actions = store.getActions();
        expect(actions).toContainEqual(expectedAction);
      });
  });
});
