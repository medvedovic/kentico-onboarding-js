import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Promise } from 'es6-promise';

import {
  repostItemDataActionFactory,
  postItemDataActionFactory
} from '../../src/actions/postDataActionFactory';
import { IItemDataDTO } from '../../src/models/ItemDataDTO';
import { EHttpActionStatus } from '../../src/constants/actionTypes';
import { OrderedMap } from 'immutable';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);


const mockSuccessPost = (_url: string, _value: string) => Promise.resolve(
  new Response()
);

const mockErrorPost = (_url: string, _value: string) => Promise.reject(
  new Error('Some nasty shit happened')
);

const onPostSuccess = (_localId: string, _response: IItemDataDTO) => ({
  type: 'POST',
  status: EHttpActionStatus.error,
  payload: undefined
});

const onPostError = (_localId: string, _response: Error) => ({
  type: 'POST',
  status: EHttpActionStatus.success,
  payload: undefined
});

const mockCreateItem = (value: string) => ({
  type: 'CREATE_ITEM',
  payload: {
    item: value
  }
});


describe('postDataActionFactory', () => {
  it('returns correct actions on success', () => {
    const dependencies = {
      postOperation: mockSuccessPost,
      onPostSuccess,
      onPostError,
      createItemOperation: mockCreateItem,
      apiEndpoint: ''
    };
    const store = mockStore({});
    const createItemExpectedResult = {
      type: 'CREATE_ITEM',
      payload: {
        item: 'Do stuff'
      }
    };
    const postExpectedResult = {
      type: 'POST',
      status: EHttpActionStatus.success,
      payload: undefined
    };


    return store.dispatch(postItemDataActionFactory(dependencies)('Do stuff'))
      .then(() => {
        const actions = store.getActions();
        expect(actions).toContainEqual(createItemExpectedResult);
        expect(actions).toContainEqual(postExpectedResult);
      });
  });

  it('returns correct actions on failure', () => {
    const dependencies = {
      postOperation: mockErrorPost,
      onPostSuccess,
      onPostError,
      createItemOperation: mockCreateItem,
      apiEndpoint: ''
    };
    const store = mockStore({});
    const postExpectedResult = {
      type: 'POST',
      status: EHttpActionStatus.error,
      payload: undefined
    };
    const createItemExpectedResult = {
      type: 'CREATE_ITEM',
      payload: {
        item: 'Do stuff'
      }
    };


    return store.dispatch(postItemDataActionFactory(dependencies)('Do stuff'))
      .catch(() => {
        const actions = store.getActions();
        expect(actions).toContainEqual(createItemExpectedResult);
        expect(actions).toContainEqual(postExpectedResult);
      });
  });
});


describe('postAndSaveData', () => {
  it('returns correct actions on success', () => {
    const mockInitialState = {
      items: {
        data: OrderedMap([['1234', { value: 'Go home' }]]),
      }
    };
    const store = mockStore(mockInitialState);
    const dependencies = {
      postOperation: mockSuccessPost,
      onPostSuccess,
      onPostError,
      apiEndpoint: ''
    };
    const postExpectedResult = {
      type: 'POST',
      status: EHttpActionStatus.success,
      payload: undefined
    };

    return store.dispatch(repostItemDataActionFactory(dependencies)('1234'))
      .then(() => {
        const actions = store.getActions();
        expect(actions).toContainEqual(postExpectedResult);
      });
  });

  it('returns correct actions on failure', () => {
    const mockInitialState = {
      items: {
        data: OrderedMap([['1234', { value: 'Go home' }]]),
      }
    };
    const store = mockStore(mockInitialState);
    const dependencies = {
      postOperation: mockErrorPost,
      onPostSuccess,
      onPostError,
      apiEndpoint: ''
    };
    const postExpectedResult = {
      type: 'POST',
      status: EHttpActionStatus.error,
      payload: undefined
    };


    return store.dispatch(repostItemDataActionFactory(dependencies)('1234'))
      .catch(() => {
        const actions = store.getActions();
        expect(actions).toContainEqual(postExpectedResult);
      });
  });
});
