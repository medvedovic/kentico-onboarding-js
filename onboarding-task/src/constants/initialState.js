import { generateGuid } from '../utils/generateGuid';
import { ListItemData } from '../models/ListItemData';
import { OrderedMap, Map } from 'immutable';
import { ListItemFlag } from '../models/ListItemFlag';

const id1 = generateGuid();
const id2 = generateGuid();

export const initialState = {
  items: new OrderedMap([
    [id1, new ListItemData({
      guid: id1,
      value: 'Make coffee',
    })],
    [id2, new ListItemData({
      guid: id2,
      value: 'Master React',
    })],
  ]),
  flags: new Map([
    [id1, new ListItemFlag()],
    [id2, new ListItemFlag()],
  ]),
};
