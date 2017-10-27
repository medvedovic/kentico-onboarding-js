import { Map, List } from 'immutable';

import { Store } from '../reducers/stores';
import { AppSettings } from '../models/AppSettings';

export const initialState: Store.IRoot = {
  items: {
    ids: List(),
    data: Map(),
    flags: Map(),
  },
  app: {
    list: new AppSettings,
  }
};
