import { List } from 'immutable';
import { generateGuid } from '../../src/utils/generateGuid';
import { ids } from '../../src/reducers/ids';
import { createItem, deleteItem } from '../../src/actions/userActions';
import { itemFactory } from '../../src/utils/itemFactory';

describe('Ids', () => {
  const guid = generateGuid();
  const item = itemFactory('Do stuff');
  it('Returns new state on create properly', () => {
    const initialState = new List();
    const expectedState = initialState.push(item.guid);

    const test = ids(initialState, createItem(item));

    expect(test).toEqual(expectedState);
  });

  it('Returns new state on delete properly', () => {
    const initialState = new List([guid]);

    const test = ids(initialState, deleteItem(guid));

    expect(test.size).toEqual(0);
  });
});
