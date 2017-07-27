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
    const expectedResult = {
      type: CREATE_ITEM,
      value: _value,
    };

    const testResult = createItem(_value);

    expect(testResult).toEqual(expectedResult);
  });

  it('Returns "Updates item" action properly', () => {
    const expectedResult = {
      type: UPDATE_ITEM,
      item: {
        guid: _guid,
        value: _value,
      },
    };

    const testResult = updateItem(_guid, _value);

    expect(testResult).toEqual(expectedResult);
  });

  it('Returns "Deletes item" action properly', () => {
    const expectedResult = {
      type: DELETE_ITEM,
      itemGuid: _guid,
    };

    const testResult = deleteItem(_guid);

    expect(testResult).toEqual(expectedResult);
  });
});
