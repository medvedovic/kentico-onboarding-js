import {
  createItem,
  updateItem,
  deleteItem,
} from '../../src/actions/userActions';
import {
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
} from '../../src/actions/actionTypes';

describe('User Actions', () => {
  const _guid = 'b0771aeb-da9e-47e4-b3f0-c52856eaacb0';
  const _value = 'Go home';

  it('Returns "Creates item" action properly', () => {
    expect(createItem(_value)).toEqual({
      type: CREATE_ITEM,
      value: _value,
    });
  });

  it('Returns "Updates item" action properly', () => {
    expect(updateItem(_guid, _value)).toEqual({
      type: UPDATE_ITEM,
      item: {
        guid: _guid,
        value: _value,
      },
    });
  });

  it('Returns "Deletes item" action properly', () => {
    expect(deleteItem(_guid)).toEqual({
      type: DELETE_ITEM,
      itemGuid: _guid,
    });
  });
});
