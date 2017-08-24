import { OrderedMap, Map, List } from 'immutable';

import { ListItemData } from '../models/ListItemData';
import { ListItemFlags } from '../models/ListItemFlags';

import { Store } from '../reducers/stores';

const id1 = 'e5706eae-b328-4254-8daa-62080e993f04';
const id2 = '69f87db6-a1bf-4490-a45f-0e9854483efa';
const id3 = '5d42f9c0-57ed-4ae3-bbf9-8fa4584c6ff6';
const id4 = '55469b04-d3c4-4a35-ad41-3452aabb4ce2';

export const initialState: Store.IRoot = {
  items: {
    ids: List([
      id1,
      id2,
      id3,
      id4,
    ]),
    data: OrderedMap([
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
    flags: Map([
      [id1, new ListItemFlags()],
      [id2, new ListItemFlags()],
      [id3, new ListItemFlags()],
      [id4, new ListItemFlags()],
    ]),
  },
};
