import React from 'react';
import PropTypes from 'prop-types';

import { ListItem } from './ListItem.jsx';
import { ListItemInput } from './ListItemInput';

export function List(props) {
  return (
    <div className="row">
      <div className="col-sm-12 col-md-6">
        <ol className="list">
          {
            props.items.map(item => (
              <ListItem
                key={item.id}
                id={item.id}
                itemName={item.itemName}
                onUpdateItem={props.onUpdateItem}
                onDeleteItem={props.onDeleteItem}
              />
            ))
          }
        </ol>
        <ListItemInput onCreateItem={props.onCreateItem} />
      </div>
    </div>
  );
}

List.propTypes = {
  items: PropTypes.array.isRequired,
  onCreateItem: PropTypes.func.isRequired,
  onUpdateItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
};
