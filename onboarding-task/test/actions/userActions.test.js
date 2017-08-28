import {
  updateItem,
  deleteItem,
} from '../../src/actions/publicActions';
import {
  UPDATE_ITEM,
  DELETE_ITEM,
} from '../../src/constants/actionTypes';

describe('User Actions', () => {
  const _id = 'b0771aeb-da9e-47e4-b3f0-c52856eaacb0';
  const _value = 'Go home';

  it('Returns "Updates item" action properly', () => {
    const expectedAction = {
      type: UPDATE_ITEM,
      payload: {
        item: {
          id: _id,
          value: _value,
        },
      },
    };

    const resultAction = updateItem(_id, _value);

    expect(resultAction).toEqual(expectedAction);
  });

  it('Returns "Deletes item" action properly', () => {
    const expectedAction = {
      type: DELETE_ITEM,
      payload: {
        id: _id,
      },
    };

    const resultAction = deleteItem(_id);

    expect(resultAction).toEqual(expectedAction);
  });
});
