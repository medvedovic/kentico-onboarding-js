import { Map } from 'immutable';
import { generateGuid } from '../../src/utils/generateGuid';
import { flagsReducer } from '../../src/reducers/flagsReducer';
import { createItem, deleteItem, toggleBeingEdited } from '../../src/actions/userActions';
import { ListItemFlag } from '../../src/models/ListItemFlag';

describe('Items Being Edited Reducer', () => {
  const id1 = generateGuid();
  const id2 = generateGuid();
  const initialState = new Map([
    [id1, new ListItemFlag()],
    [id2, new ListItemFlag()],
  ]);

  it('Return new state on toggle', () => {
    const expectedResult = new Map([
      [id1, new ListItemFlag()],
      [id2, new ListItemFlag({
        isBeingEdited: true,
      })],
    ]);

    const result = flagsReducer(initialState, toggleBeingEdited(id2));

    expect(result).toEqual(expectedResult);
  });

  it('Returns new state on delete', () => {
    const expectedResult = new Map([
      [id1, new ListItemFlag()],
    ]);
    const result = flagsReducer(initialState, deleteItem(id2));

    expect(result).toEqual(expectedResult);
  });

  it('Returns default state on unknown action', () => {
    const expectedResult = new Map([
      [id1, new ListItemFlag()],
      [id2, new ListItemFlag()],
    ]);
    const dummyItem = {
      guid: '',
      value: '',
    };

    const result = flagsReducer(initialState, createItem(dummyItem));

    expect(result).toEqual(expectedResult);
  });
});
