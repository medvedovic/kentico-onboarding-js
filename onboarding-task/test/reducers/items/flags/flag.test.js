import { ListItemFlag } from '../../../../src/models/ListItemFlag';
import { flag } from '../../../../src/reducers/items/flags/flag';
import { createItem, toggleBeingEdited } from '../../../../src/actions/publicActions';

describe('Flag Reducer', () => {
  it('returns new flags on create item', () => {
    const test = flag(undefined, createItem('Make a sandwich'));

    expect(test).toEqual(new ListItemFlag());
  });

  it('toggles being edited properly', () => {
    const expectedState = new ListItemFlag({
      isBeingEdited: true,
    });

    const newState = flag(new ListItemFlag(), toggleBeingEdited(''));

    expect(newState).toEqual(expectedState);
  });

  it('returns default state on wrong input', () => {
    const expectedState = new ListItemFlag();

    const test = flag(undefined, createItem(''));

    expect(test).toEqual(expectedState);
  });
});
