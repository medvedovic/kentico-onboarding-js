import { ListItemData } from '../../src/models/ListItemData.ts';
import { createItemBuilder } from '../../src/actions/actionCreators.ts';
import { LocalItemActions } from '../../src/constants/actionTypes.ts';

describe('Action creators', () => {
  it('builds createItem action properly', () => {
    const expectedAction = {
      type: LocalItemActions.CREATE_ITEM,
      payload: {
        item: new ListItemData({
          id: 'xxyy',
          value: 'Make a sandwich',
        }),
      },
    };
    const dummyFactory = (value) => new ListItemData({
      id: 'xxyy',
      value,
    });

    const testAction = createItemBuilder(dummyFactory)('Make a sandwich');

    expect(testAction).toEqual(expectedAction);
  });
});
