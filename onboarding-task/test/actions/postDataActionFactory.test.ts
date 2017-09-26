import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Promise } from 'es6-promise';

import { postDataActionFactory } from '../../src/actions/postDataActionFactory';
import { IItemDataDTO } from '../../src/models/ItemDataDTO';
import { EHttpActionStatus } from '../../src/constants/actionTypes';


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
      createItemOperation: mockCreateItem
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


    return store.dispatch(postDataActionFactory(dependencies)('', 'Do stuff'))
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
      createItemOperation: mockCreateItem
    };
    const store = mockStore({});
    console.log(store.getActions());
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


    return store.dispatch(postDataActionFactory(dependencies)('', 'Do stuff'))
      .catch(() => {
        const actions = store.getActions();
        expect(actions).toContainEqual(createItemExpectedResult);
        expect(actions).toContainEqual(postExpectedResult);
      });
  });
});
