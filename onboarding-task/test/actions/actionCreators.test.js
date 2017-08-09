import { ListItemData } from '../../src/models/ListItemData';
import { createItemBuilder } from '../../src/actions/actionCreators';
import { CREATE_ITEM } from '../../src/constants/actionTypes';

describe('Action creators', () => {
  it('builds createItem action properly', () => {
    const expectedAction = {
      type: CREATE_ITEM,
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
