import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Promise } from 'es6-promise';
import { OrderedMap } from 'immutable';

import {
  postItemDataActionFactory,
  postItemDataCore
} from '../../../src/actions/httpActionFactories/postDataActionFactory';
import {
  itemDataActionFactory
} from '../../../src/actions/httpActionFactories/itemDataActionFactory';

import { IItemDataDTO } from '../../../src/models/ItemDataDTO';
import {
  LocalItemActions
} from '../../../src/constants/actionTypes';
import { EHttpActionStatus } from '../../../src/constants/EHttpActionStatus';
import { HttpAction } from '../../../src/constants/HttpAction';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const id = '1234';
const mockSuccessPost = (_url: string) => Promise.resolve(
  new Response(JSON.stringify({ id, value: 'Go home' }))
);

const mockErrorPost = (_url: string) => Promise.reject(
  new Error('Some nasty shit happened')
);

const onPostSuccess = (_localId: string, _response: IItemDataDTO) => ({
  type: HttpAction.POST,
  status: EHttpActionStatus.success,
  payload: _response
});

const onPostError = (_localId: string, _response: Error) => ({
  type: HttpAction.POST,
  status: EHttpActionStatus.error,
  payload: _response
});


const mockCreateItem = (value: string) => ({
  type: LocalItemActions.CREATE_ITEM,
  payload: {
    item: { id, value }
  }
});


describe('postDataActionFactory', () => {
  it('returns correct actions on success', () => {
    const dependencies = {
      operation: mockSuccessPost,
      onSuccess: onPostSuccess,
      onError: onPostError,
      createItemOperation: mockCreateItem,
      apiEndpoint: ''
    };
    const store = mockStore({});
    const createItemExpectedResult = {
      type: LocalItemActions.CREATE_ITEM,
      payload: {
        item: { id, value: 'Go home' }
      }
    };
    const postExpectedResult = {
      type: HttpAction.POST,
      status: EHttpActionStatus.success,
      payload: { id, value: 'Go home' }
    };


    return store.dispatch(postItemDataActionFactory(dependencies)('Go home'))
      .then(() => {
        const actions = store.getActions();
        expect(actions).toContainEqual(createItemExpectedResult);
        expect(actions).toContainEqual(postExpectedResult);
      });
  });

  it('returns correct actions on failure', () => {
    const dependencies = {
      operation: mockErrorPost,
      onSuccess: onPostSuccess,
      onError: onPostError,
      createItemOperation: mockCreateItem,
      apiEndpoint: ''
    };
    const store = mockStore({});
    const postExpectedResult = {
      type: HttpAction.POST,
      status: EHttpActionStatus.error,
      payload: new Error('Some nasty shit happened')
    };
    const createItemExpectedResult = {
      type: LocalItemActions.CREATE_ITEM,
      payload: {
        item: { id, value: 'Do stuff' }
      }
    };


    return store.dispatch(postItemDataActionFactory(dependencies)('Do stuff'))
      .then(() => {
        const actions = store.getActions();
        expect(actions).toContainEqual(createItemExpectedResult);
        expect(actions).toContainEqual(postExpectedResult);
      });
  });
});

describe('repostData', () => {
  const mockInitialState = () => ({
    items: {
      data: OrderedMap([[id, { value: 'Go home' }]])
    }
  });

  it('returns correct actions on success', () => {
    const store = mockStore(mockInitialState());
    const dependencies = {
      operation: mockSuccessPost,
      onSuccess: onPostSuccess,
      onError: onPostError,
      apiEndpoint: ''
    };
    const postExpectedResult = {
      type: HttpAction.POST,
      status: EHttpActionStatus.success,
      payload:  { id, value: 'Go home' }
    };

    return store.dispatch(itemDataActionFactory(postItemDataCore, { ...dependencies })(id))
      .then(() => {
        const actions = store.getActions();
        expect(actions).toContainEqual(postExpectedResult);
      });
  });

  it('returns correct actions on failure', () => {
    const store = mockStore(mockInitialState());
    const dependencies = {
      operation: mockErrorPost,
      onSuccess: onPostSuccess,
      onError: onPostError,
      apiEndpoint: ''
    };
    const postExpectedResult = {
      type: HttpAction.POST,
      status: EHttpActionStatus.error,
      payload: new Error('Some nasty shit happened')
    };


    return store.dispatch(itemDataActionFactory(postItemDataCore, { ...dependencies })(id))
      .then(() => {
        const actions = store.getActions();
        expect(actions).toContainEqual(postExpectedResult);
      });
  });
});
