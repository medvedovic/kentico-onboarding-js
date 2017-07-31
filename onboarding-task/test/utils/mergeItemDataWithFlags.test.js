import { OrderedMap, Map } from 'immutable';
import { mergeItemDataWithFlags } from '../../src/utils/mergeItemDataWithFlags';
import { ListItemViewModel } from '../../src/models/ListItemViewModel';
import { ListItemData } from '../../src/models/ListItemData';
import { ListItemFlag } from '../../src/models/ListItemFlag';

describe('Merge Item Data With Flags', () => {
  it('Returns merged data with flags', () => {
    const guid = 'xxxxxx-yyyyyy';
    const item = new ListItemData({
      guid,
      value: 'Do stuff',
    });
    const flags = new ListItemFlag();

    const expectedResult = new OrderedMap([
      [guid,
        new ListItemViewModel({
          listItemData: item,
          listItemFlag: flags,
        })],
    ]);

    const test = mergeItemDataWithFlags(new OrderedMap([[guid, item]]), new Map([[guid, flags]]));

    expect(test).toEqual(expectedResult);
  });
});
