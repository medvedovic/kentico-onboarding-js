import { generateGuid } from './generateGuid';
import { ListItem } from '../models/ListItem';

export const itemFactory = (value) => (
  new ListItem({
    guid: generateGuid(),
    value,
  })
);
