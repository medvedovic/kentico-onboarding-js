import React from 'react';
import PropTypes from 'prop-types';
import { OrderedMap } from 'immutable';

import { ListItemInput } from './ListItemInput';
import { ListItem } from './ListItem';

export const List = ({ items, actions }) => (
  <div className="row">
    <div className="col-sm-12 col-md-6">
      <ol className="list">
        {
          items.entrySeq().map(([guid, item]) => (
            <li key={guid}>
              <ListItem item={item} />
            </li>
          ))
        }
      </ol>
      <ListItemInput onCreateItem={actions.onCreateItem} />
    </div>
  </div>
);

List.propTypes = {
  items: PropTypes.instanceOf(OrderedMap),
  actions: PropTypes.shape({
    onCreateItem: PropTypes.func.isRequired,
  }).isRequired,
};
