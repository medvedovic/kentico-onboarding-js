import React from 'react';
import PropTypes from 'prop-types';

import { ListItemInput } from './ListItemInput';
import { ListItemContainer } from '../containers/ListItem';

export const List = ({ itemIds, onCreateItem }) => (
  <div className="row">
    <div className="col-sm-12 col-md-6">
      <ol className="list">
        {
          itemIds.map(guid => (
            <li key={guid}>
              <ListItemContainer guid={guid} />
            </li>
          ))
        }
      </ol>
      <ListItemInput onCreateItem={onCreateItem} />
    </div>
  </div>
);

List.displayName = 'List';

List.propTypes = {
  itemIds: PropTypes.array.isRequired,
  onCreateItem: PropTypes.func.isRequired,
};
