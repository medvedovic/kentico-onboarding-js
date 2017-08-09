import { ListItemData } from '../models/ListItemData';

export const itemFactory = (idGenerator) =>
  (value) => (
    new ListItemData({
      id: idGenerator(),
      value,
    })
  );
