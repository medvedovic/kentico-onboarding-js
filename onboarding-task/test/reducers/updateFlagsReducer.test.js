import { ListItemFlag } from '../../src/models/ListItemFlag';
import { flag } from '../../src/reducers/flags/flag';
import { toggleBeingEdited } from '../../src/actions/userActions';

describe('Update Flags Reducer', () => {
  it('Returns state properly on update', () => {
    const expectedState = new ListItemFlag({
      isBeingEdited: true,
    });

    const newState = flag(new ListItemFlag(), toggleBeingEdited(''));

    expect(newState).toEqual(expectedState);
  });
});
