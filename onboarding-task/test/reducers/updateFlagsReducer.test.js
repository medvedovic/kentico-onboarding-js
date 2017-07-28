import { ListItemFlag } from '../../src/models/ListItemFlag';
import { updateFlagsReducer } from '../../src/reducers/updateFlagsReducer';
import { toggleBeingEdited } from '../../src/actions/userActions';

describe('Update Flags Reducer', () => {
  it('Returns state properly on update', () => {
    const expectedState = new ListItemFlag({
      isBeingEdited: true,
    });

    const newState = updateFlagsReducer(new ListItemFlag(), toggleBeingEdited(''));

    expect(newState).toEqual(expectedState);
  });
});
