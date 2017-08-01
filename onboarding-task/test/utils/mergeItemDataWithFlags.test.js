import { mergeItemDataWithFlags } from '../../src/utils/mergeItemDataWithFlags';
import { ListItemData } from '../../src/models/ListItemData';
import { ListItemFlag } from '../../src/models/ListItemFlag';

describe('Merge Item Data With Flags', () => {
  it('Returns merged data with flags', () => {
    const guid = 'xxxxxx-yyyyyy';
    const item = new ListItemData({
      guid,
      value: 'Do stuff',
    });
    const itemFlags = new ListItemFlag();

    const expectedResult = {
      guid,
      value: 'Do stuff',
      isBeingEdited: false,
    };

    const test = mergeItemDataWithFlags(item, itemFlags);

    expect(test).toEqual(expectedResult);
  });
});
