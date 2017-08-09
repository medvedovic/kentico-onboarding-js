import { Map } from 'immutable';
import { generateGuid } from '../../src/utils/generateGuid';
import { flags } from '../../src/reducers/items/flags/flags';
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

    const result = flags(initialState, toggleBeingEdited(id2));

    expect(result).toEqual(expectedResult);
  });

  it('Returns new state on delete', () => {
    const expectedResult = new Map([
      [id1, new ListItemFlag()],
    ]);
    const result = flags(initialState, deleteItem(id2));

    expect(result).toEqual(expectedResult);
  });

  it('Returns new state on create', () => {
    const dummyId = 'xxyyzz';
    const expectedResult = new Map([
      [id1, new ListItemFlag()],
      [id2, new ListItemFlag()],
      [dummyId, new ListItemFlag()],
    ]);
    const dummyItem = {
      id: dummyId,
      value: '',
    };

    const result = flags(initialState, createItem(dummyItem));

    expect(result).toEqual(expectedResult);
  });
});
