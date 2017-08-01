import memoize from 'memoizee';

export const mergeItemDataWithFlags = (item, flags) => ({
  ...item.toJS(),
  ...flags.toJS(),
});

export const memoizedMergeItemDataWithFlags = memoize(mergeItemDataWithFlags);
