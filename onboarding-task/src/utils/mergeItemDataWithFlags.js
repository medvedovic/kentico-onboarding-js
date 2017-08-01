export const mergeItemDataWithFlags = (item, flags) => ({
  ...item.toJS(),
  ...flags.toJS(),
});
