import { generateGuid } from '../utils/generateGuid';
import { ListItemModel } from '../models/ListItem';
import { OrderedMap } from 'immutable';

const id1 = generateGuid();
const id2 = generateGuid();
export const initialItems = new OrderedMap([
  [id1, new ListItemModel({
    guid: id1,
    value: 'Make coffee',
  })],
  [id2, new ListItemModel({
    guid: id2,
    value: 'Master React',
  })],
]);
