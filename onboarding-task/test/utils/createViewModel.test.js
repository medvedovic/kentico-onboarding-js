import { memoizedCreateViewModel, createViewModel } from '../../src/utils/createViewModel';
import { ListItemData } from '../../src/models/ListItemData';
import { ListItemFlag } from '../../src/models/ListItemFlag';

const id = 'xxxxxx-yyyyyy';
const item = new ListItemData({
  id,
  value: 'Do stuff',
});
const itemFlags = new ListItemFlag();

describe('CreateViewModel', () => {
  it('returns merged data with flags', () => {
    const expectedResult = {
      id,
      value: 'Do stuff',
      isBeingEdited: false,
    };

    const test = createViewModel(item, itemFlags);

    expect(test).toEqual(expectedResult);
  });
});

describe('MemoizedCreateViewModel', () => {
  it('returns same object for the same input', () => {
    const test1 = memoizedCreateViewModel(item, itemFlags);
    const test2 = memoizedCreateViewModel(item, itemFlags);

    expect(test1).toBe(test2);
  });
});
