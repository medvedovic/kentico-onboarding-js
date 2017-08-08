import React from 'react';
import PropTypes from 'prop-types';

import { ListItemDisplay } from './ListItemDisplay';
import { ListItemEditor } from './ListItemEditor';

export const ListItem = ({ itemViewModel, onToggleBeingEdited, onUpdateItem, onDeleteItem }) => {
  return (
    itemViewModel.isBeingEdited ?
      <ListItemEditor
        itemViewModel={itemViewModel}
        onCancelEdit={onToggleBeingEdited}
        onUpdateItem={onUpdateItem}
        onDeleteItem={onDeleteItem}
      /> :
      <ListItemDisplay
        itemViewModel={itemViewModel}
        onClick={onToggleBeingEdited}
      />
  );
};

ListItem.displayName = 'ListItem';
ListItem.propTypes = {
  itemViewModel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    isBeingEdited: PropTypes.bool.isRequired,
  }).isRequired,
  onToggleBeingEdited: PropTypes.func.isRequired,
  onUpdateItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
};
