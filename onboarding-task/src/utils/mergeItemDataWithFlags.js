import memoize from 'memoizee';

export const mergeItemDataWithFlags = (guid, value, isBeingEdited) => ({
  guid,
  value,
  isBeingEdited,
});

export const memoizedMergeItemDataWithFlags = memoize(mergeItemDataWithFlags);
