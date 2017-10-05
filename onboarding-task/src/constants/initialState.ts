import { OrderedMap, Map, List } from 'immutable';

import { Store } from '../reducers/stores';
import { AppSettings } from './AppSettings';

export const initialState: Store.IRoot = {
  items: {
    ids: List(),
    data: OrderedMap(),
    flags: Map(),
  },
  app: {
    list: new AppSettings,
  }
};
