import { OrderedMap, Map, List } from 'immutable';

import { Store } from '../reducers/stores';
import { AppSettings } from '../reducers/app/settings';

export const initialState: Store.IRoot = {
  items: {
    ids: List(),
    data: OrderedMap(),
    flags: Map(),
  },
  app: {
    settings: new AppSettings,
  }
};
