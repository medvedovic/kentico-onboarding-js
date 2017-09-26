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

const mockPutSuccess = (_url: string, _id: string, _value: string) => Promise.resolve(
  new Response()
);
const onPutSuccess = (_localId: string, _response: IItemDataDTO) => ({
  type: HttpAction.PUT,
  status: EHttpActionStatus.success,
  payload: undefined
});
const onPutError = (_localId: string, _response: Error) => ({
  type: HttpAction.PUT,
  status: EHttpActionStatus.success,
  payload: undefined
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
    let mockInitialState = {
      items: {
        data: OrderedMap([['1234', { value: 'Do stuff' }]])
      }
    };
    const store = mockStore(mockInitialState);
    const dependencies = {
      putOperation: mockPutSuccess,
      onPutSuccess,
      onPutError,
      updateItemOperation
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
      payload: undefined
    };

    return store.dispatch(putDataActionFactory(dependencies)('url', '1234', 'Go home'))
      .then(() => {
        const actions = store.getActions();
        expect(actions).toContainEqual(putSuccessResult);
        expect(actions).toContainEqual(updateResult);
      });
  });
});
