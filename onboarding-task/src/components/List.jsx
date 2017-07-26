import React from 'react';
import PropTypes from 'prop-types';
import { OrderedMap } from 'immutable';

import { ListItem } from './ListItem.jsx';
import { ListItemInput } from './ListItemInput';

export const List = ({ items, actions }) => (
  <div className="row">
    <div className="col-sm-12 col-md-6">
      <ol className="list">
        {
          items.map((item, key) => (
            <li key={key}>
              <ListItem
                id={key}
                item={item}
                onUpdateItem={actions.updateItem}
                onDeleteItem={actions.deleteItem}
              />
            </li>
          ))
        }
      </ol>
      <ListItemInput onCreateItem={actions.createItem} />
    </div>
  </div>
);

List.propTypes = {
  items: PropTypes.instanceOf(OrderedMap),
  actions: PropTypes.shape({
    createItem: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
  }).isRequired,
};
