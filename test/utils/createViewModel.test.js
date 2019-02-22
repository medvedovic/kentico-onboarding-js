import { memoizedCreateViewModel, createViewModel } from '../../src/utils/createViewModel.ts';
import { ListItemData } from '../../src/models/ListItemData.ts';
import { ListItemFlags } from '../../src/models/ListItemFlags.ts';

const id = '50';
const item = new ListItemData({
  id,
  value: 'Do stuff',
});
const itemFlags = new ListItemFlags();

describe('CreateViewModel', () => {
  it('returns merged data with flags', () => {
    const expectedResult = {
      id,
      value: 'Do stuff',
      isBeingEdited: false,
      isSavedSuccess: true,
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
