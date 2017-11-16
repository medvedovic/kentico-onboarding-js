import { deleteItemThunkFactory } from '../../../src/actions/httpActionFactories/deleteItemThunkFactory';
import { HttpAction } from '../../../src/constants/HttpAction';
import { DELETE_ITEM, DELETE_ITEM_AT_SERVER_FAILURE } from '../../../src/constants/actionTypes';

const dispatch = jest.fn().mockImplementation((a: any) => a);

const mockSuccessfulRequest = (_url: string, _httpAction: HttpAction) =>
  Promise.resolve(new Response());

const mockErrorRequest = (_url: string, _httpMethod: HttpAction) =>
  Promise.reject(new Error('Error occurred'));

const onSuccess = (_itemId: string, _response: Response) => ({
  type: DELETE_ITEM,
  payload: {
    id: _itemId
  }
});

const onError = (_itemId: string, _error: Error) => ({
  type: DELETE_ITEM_AT_SERVER_FAILURE,
  payload: {
    error: _error,
    id: _itemId
  }
});

const id = 'e90c191a-e58d-458b-b453-25a55d26ba54';

describe('deleteItemThunkFactory', () => {
  it('dispatches correct action on success', async () => {
    const expectedAction = {
      type: DELETE_ITEM,
      payload: {
        id
      }
    };
    const dependencies = {
      sendRequest: mockSuccessfulRequest,
      onSuccess,
      onError,
      apiEndpoint: ''
    };
    const deleteAsync = deleteItemThunkFactory(dependencies)(id);

    await deleteAsync(dispatch);

    expect(dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('dispatches correct action on failure', async () => {
    const expectedAction = {
      type: DELETE_ITEM_AT_SERVER_FAILURE,
      payload: {
        error: new Error('Error occurred'),
        id
      }
    };
    const dependencies = {
      sendRequest: mockErrorRequest,
      onSuccess,
      onError,
      httpMethod: HttpAction.DELETE,
      apiEndpoint: ''
    };
    const deleteAsync = deleteItemThunkFactory(dependencies)(id);
    await deleteAsync(dispatch);

    expect(dispatch).toHaveBeenCalledWith(expectedAction);
  })
});
