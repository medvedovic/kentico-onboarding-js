import React from 'react';
import PropTypes from 'prop-types';
import { OrderedMap } from 'immutable';

import { ListItemInput } from './ListItemInput';
import { ListItem } from './ListItem';

export const List = ({ items, itemsBeingEdited, onCreateItem, onToggleBeingEdited }) => (
  <div className="row">
    <div className="col-sm-12 col-md-6">
      <ol className="list">
        {
          items.entrySeq().map(([guid, item]) => (
            <li key={guid}>
              <ListItem item={item} isBeingEdited={itemsBeingEdited.get(guid)} onToggleBeingEdited={onToggleBeingEdited} />
            </li>
          ))
        }
      </ol>
      <ListItemInput onCreateItem={onCreateItem} />
    </div>
  </div>
);

List.propTypes = {
  items: PropTypes.instanceOf(OrderedMap),
  itemsBeingEdited: PropTypes.instanceOf(OrderedMap),
  onCreateItem: PropTypes.func.isRequired,
  onToggleBeingEdited: PropTypes.func.isRequired,
};
