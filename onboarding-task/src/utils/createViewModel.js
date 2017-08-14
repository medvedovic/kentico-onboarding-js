import memoize from 'memoizee';

export const createViewModel = (item, flags) => ({
  ...item.toJS(),
  ...flags.toJS(),
});

export const memoizedCreateViewModel = memoize(createViewModel);
