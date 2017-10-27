import { Map, List } from 'immutable';

import { Store } from '../reducers/stores';

export const initialState: Store.IRoot = {
  items: {
    ids: List(),
    data: Map(),
    flags: Map(),
  },
  app: {
    list: {
      showLoader: true,
      fetchHasFailed: false,
    }
  }
};
