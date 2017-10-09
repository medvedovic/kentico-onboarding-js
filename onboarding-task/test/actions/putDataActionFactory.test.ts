import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Promise } from 'es6-promise';
import { IItemDataDTO } from '../../src/models/ItemDataDTO';
import {
  EHttpActionStatus,
  HttpAction,
  LocalItemActions,
} from '../../src/constants/actionTypes';
import { Map } from 'immutable';
import {
  putDataActionFactory,
  putDataActionFactoryCore
} from '../../src/actions/httpActionFactories/putDataActionFactory';
import { ListItemData } from '../../src/models/ListItemData';
import { itemDataActionFactory } from '../../src/actions/httpActionFactories/itemDataActionFactory';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const id = '1234';

const mockInitialState = () => ({
  items: {
    data: Map([[id, new ListItemData({ id, value: 'Do stuff' })]]),
  },
});


const mockPutSuccess = (_url: string, _dto: IItemDataDTO) => Promise.resolve(
  new Response(JSON.stringify({ id, value: 'Go home' }))
);
const mockPutError = (_url: string, _dto: IItemDataDTO) => Promise.reject(
  new Error('Some nasty shit happened')
);
const onPutSuccess = (_localId: string, _response: IItemDataDTO) => ({
  type: HttpAction.PUT,
  status: EHttpActionStatus.success,
  payload: undefined
});
const onPutError = (_localId: string, _response: Error) => ({
  type: HttpAction.PUT,
  status: EHttpActionStatus.error,
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
  it('returns correct actions on success', () => {
    const store = mockStore(mockInitialState());
    const dependencies = {
      operation: mockPutSuccess,
      onSuccess: onPutSuccess,
      onError: onPutError,
      updateItemOperation,
      apiEndpoint: ''
    };
    const putSuccessResult = {
      type: HttpAction.PUT,
      status: EHttpActionStatus.success,
      payload: undefined
    };


    return store.dispatch(putDataActionFactory(dependencies)(id, 'Go home'))
      .then(() => {
        const actions = store.getActions();
        expect(actions).toContainEqual(updateResult);
        expect(actions).toContainEqual(putSuccessResult);
      });
  });

  it('returns correct actions on failure', () => {
    const store = mockStore(mockInitialState());
    const dependencies = {
      operation: mockPutError,
      onSuccess: onPutSuccess,
      onError: onPutError,
      updateItemOperation,
      apiEndpoint: ''
    };
    const expectedResult = {
      type: HttpAction.PUT,
      status: EHttpActionStatus.error,
      payload: new Error('Some nasty shit happened')
    };

    return store.dispatch(putDataActionFactory(dependencies)(id, 'Go home'))
      .then(() => {
        const actions = store.getActions();
        expect(actions).toContainEqual(updateResult);
        expect(actions).toContainEqual(expectedResult);
      });
  });
});

describe('reput', () => {
  it('returns correct actions on success', () => {
    const store = mockStore(mockInitialState());
    const dependencies = {
      operation: mockPutSuccess,
      onSuccess: onPutSuccess,
      onError: onPutError,
      apiEndpoint: ''
    };
    const expectedResult = {
      type: HttpAction.PUT,
      status: EHttpActionStatus.success,
      payload: undefined
    };

    return store.dispatch(itemDataActionFactory(putDataActionFactoryCore, { ...dependencies })(id))
      .then(() => {
        const actions = store.getActions();
        expect(actions).toContainEqual(expectedResult);
        console.log(actions);
      });
  });

  it('returns correct actions on failure', () => {
    const store = mockStore(mockInitialState());
    const dependencies = {
      operation: mockPutError,
      onSuccess: onPutSuccess,
      onError: onPutError,
      apiEndpoint: ''
    };
    const expectedResult = {
      type: HttpAction.PUT,
      status: EHttpActionStatus.error,
      payload: new Error('Some nasty shit happened')
    };

    return store.dispatch(itemDataActionFactory(putDataActionFactoryCore, { ...dependencies })(id))
      .then(() => {
        const actions = store.getActions();
        expect(actions).toContainEqual(expectedResult);
      });
  });
});
