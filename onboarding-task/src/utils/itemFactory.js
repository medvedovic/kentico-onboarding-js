import { generateGuid } from './generateGuid';
import { ListItemData } from '../models/ListItemData';

export const itemFactory = (value) => (
  new ListItemData({
    id: generateGuid(),
    value,
  })
);
