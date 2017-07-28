import { OrderedMap } from 'immutable';
import { generateGuid } from '../../src/utils/generateGuid';
import { itemsBeingEdited } from '../../src/reducers/itemsBeingEdited';
import {createItem, deleteItem, toggleBeingEdited} from '../../src/actions/userActions';

describe('Items Being Edited Reducer', () => {
  const id1 = generateGuid();
  const id2 = generateGuid();
  const initialState = new OrderedMap([
    [id1, false],
    [id2, false],
  ]);

  it('Return new state on toggle', () => {
    const expectedResult = new OrderedMap([
      [id1, false],
      [id2, true],
    ]);

    const result = itemsBeingEdited(initialState, toggleBeingEdited(id2));

    expect(result).toEqual(expectedResult);
  });

  it('Returns new state on delete', () => {
    const expectedResult = new OrderedMap([
      [id1, false],
    ]);
    const result = itemsBeingEdited(initialState, deleteItem(id2));

    expect(result).toEqual(expectedResult);
  });

  it('Returns default state on unknown action', () => {
    const expectedResult = new OrderedMap([
      [id1, false],
      [id2, false],
    ]);
    const dummyItem = {
      guid: '',
      value: '',
    };

    const result = itemsBeingEdited(initialState, createItem(dummyItem));

    expect(result).toEqual(expectedResult);
  });
});
