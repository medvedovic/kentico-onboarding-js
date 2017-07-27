import { generateGuid } from '../utils/generateGuid';
import { ListItem } from '../models/ListItem';
import { OrderedMap } from 'immutable';

const id1 = generateGuid();
const id2 = generateGuid();
export const initialItems = new OrderedMap([
  [id1, new ListItem({
    guid: id1,
    value: 'Make coffee',
  })],
  [id2, new ListItem({
    guid: id2,
    value: 'Master React',
  })],
]);
