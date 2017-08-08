import { OrderedMap, Map, List } from 'immutable';
import { generateGuid } from '../utils/generateGuid';
import { ListItemData } from '../models/ListItemData';
import { ListItemFlag } from '../models/ListItemFlag';

const id1 = generateGuid();
const id2 = generateGuid();
const id3 = generateGuid();
const id4 = generateGuid();

export const initialState = {
  items: {
    ids: new List([
      id1,
      id2,
      id3,
      id4,
    ]),
    byIds: new OrderedMap([
      [id1, new ListItemData({
        id: id1,
        value: 'Make coffee',
      })],
      [id2, new ListItemData({
        id: id2,
        value: 'Master React',
      })],
      [id3, new ListItemData({
        id: id3,
        value: '????',
      })],
      [id4, new ListItemData({
        id: id4,
        value: 'Profit',
      })],
    ]),
    flags: new Map([
      [id1, new ListItemFlag()],
      [id2, new ListItemFlag()],
      [id3, new ListItemFlag()],
      [id4, new ListItemFlag()],
    ]),
  },
};
