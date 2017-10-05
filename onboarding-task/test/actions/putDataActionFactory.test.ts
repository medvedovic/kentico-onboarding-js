import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Promise } from 'es6-promise';
import { putDataActionFactory } from '../../src/actions/putDataActionFactory';
import { IItemDataDTO } from '../../src/models/ItemDataDTO';
import {
  EHttpActionStatus,
  HttpAction,
  UPDATE_ITEM
} from '../../src/constants/actionTypes';
import { OrderedMap } from 'immutable';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);


let mockInitialState = () => ({
  items: {
    data: OrderedMap([['1234', { id: '1234', value: 'Do stuff' }]])
  }
});

const mockPutSuccess = (_url: string, _id: string, _value: string) => Promise.resolve(
  new Response(JSON.stringify({id: '', value: ''}))
);
const mockPutError = (_url: string, _id: string, _value: string) => Promise.reject(
  new Error('Some nasty shit happened')
);
const onPutSuccess = (_localId: string, _response: IItemDataDTO) => ({
  type: HttpAction.PUT,
  status: EHttpActionStatus.success,
  payload: 'success'
});
const onPutError = (_localId: string, _response: Error) => ({
  type: HttpAction.PUT,
  status: EHttpActionStatus.error,
  payload: 'Some nasty shit happened'
});

const updateItemOperation = (localId: string, value: string) => ({
  type: UPDATE_ITEM,
  payload: {
    localId,
    value
  }
});


describe('putDataActionFactory', () => {
  it('returns correct actions on success', () => {
    const store = mockStore(mockInitialState());
    const dependencies = {
      putOperation: mockPutSuccess,
      onPutSuccess,
      onPutError,
      updateItemOperation,
      apiEndpoint: ''
    };
    const updateResult = {
      type: UPDATE_ITEM,
      payload: {
        localId: '1234',
        value: 'Go home'
      }
    };
    const putSuccessResult = {
      type: HttpAction.PUT,
      status: EHttpActionStatus.success,
      payload: 'success'
    };


    return store.dispatch(putDataActionFactory(dependencies)('1234', 'Go home'))
      .then(() => {
        const actions = store.getActions();
        expect(actions).toContainEqual(updateResult);
        expect(actions).toContainEqual(putSuccessResult);
      });
  });

  it('returns correct actions on failure', () => {
    const store = mockStore(mockInitialState());
    const dependencies = {
      putOperation: mockPutError,
      onPutSuccess,
      onPutError,
      updateItemOperation,
      apiEndpoint: ''
    };
    const expectedResult = {
      type: HttpAction.PUT,
      status: EHttpActionStatus.error,
      payload: 'Some nasty shit happened'
    };


    return store.dispatch(putDataActionFactory(dependencies)('1234', 'Go home'))
      .catch(() => {
        const actions = store.getActions();
        expect(actions).toContainEqual(expectedResult);
      });
  });
});
