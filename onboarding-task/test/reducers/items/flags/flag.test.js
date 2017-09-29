import { ListItemFlags } from '../../../../src/models/ListItemFlags';
import { flag } from '../../../../src/reducers/items/flags/flag';
import { toggleBeingEdited } from '../../../../src/actions/publicActions';
import { ListItemData } from '../../../../src/models/ListItemData';

const createItem = (value) =>
  new ListItemData({ id: '982f42cd-106e-4530-b6bc-bcdfe7fecbb9', value });

describe('Flag Reducer', () => {
  it('returns new flags on create item', () => {
    const test = flag(undefined, createItem('Make a sandwich'));

    expect(test).toEqual(new ListItemFlags());
  });

  it('toggles being edited properly', () => {
    const expectedState = new ListItemFlags({
      isBeingEdited: true,
    });

    const newState = flag(new ListItemFlags(), toggleBeingEdited(''));

    expect(newState).toEqual(expectedState);
  });

  it('returns default state on wrong input', () => {
    const expectedState = new ListItemFlags();

    const test = flag(undefined, createItem(''));

    expect(test).toEqual(expectedState);
  });
});
