import {memoizedMergeItemDataWithFlags, mergeItemDataWithFlags} from '../../src/utils/mergeItemDataWithFlags';
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

    const test = mergeItemDataWithFlags(item.guid, item.value, itemFlags.isBeingEdited);

    expect(test).toEqual(expectedResult);
  });

  it('Returns same object for the same input', () => {
    const guid = 'xxxxxx';
    const value = 'Do stuff';
    const isBeingEdited = true;

    const test1 = memoizedMergeItemDataWithFlags(guid, value, isBeingEdited);
    const test2 = memoizedMergeItemDataWithFlags(guid, value, isBeingEdited);

    expect(test1).toBe(test2);
  });
});
