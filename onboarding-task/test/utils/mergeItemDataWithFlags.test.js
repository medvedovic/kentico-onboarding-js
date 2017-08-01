import {memoizedMergeItemDataWithFlags, mergeItemDataWithFlags} from '../../src/utils/mergeItemDataWithFlags';
import { ListItemData } from '../../src/models/ListItemData';
import { ListItemFlag } from '../../src/models/ListItemFlag';

const guid = 'xxxxxx-yyyyyy';
const item = new ListItemData({
  guid,
  value: 'Do stuff',
});
const itemFlags = new ListItemFlag();

describe('Merge Item Data With Flags', () => {
  it('Returns merged data with flags', () => {
    const expectedResult = {
      guid,
      value: 'Do stuff',
      isBeingEdited: false,
    };

    const test = mergeItemDataWithFlags(item, itemFlags);

    expect(test).toEqual(expectedResult);
  });
});

describe('Memorized Merge Item Data With Flags', () => {
  it('Returns same object for the same input', () => {
    const test1 = memoizedMergeItemDataWithFlags(item, itemFlags);
    const test2 = memoizedMergeItemDataWithFlags(item, itemFlags);

    expect(test1).toBe(test2);
  });
});
