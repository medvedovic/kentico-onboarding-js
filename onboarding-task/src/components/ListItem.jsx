import React from 'react';
import PropTypes from 'prop-types';
import { ListItemDisplay } from './ListItemDisplay';
import { ListItemEditorContainer } from '../containers/ListItemEditor';

export const ListItem = ({ itemViewModel, onToggleBeingEdited }) => {
  if (itemViewModel.isBeingEdited) {
    return (
      <ListItemEditorContainer
        itemViewModel={itemViewModel}
        onCancelEdit={onToggleBeingEdited}
      />
    );
  }

  return <ListItemDisplay itemViewModel={itemViewModel} onClick={onToggleBeingEdited} />;
};

ListItem.displayName = 'ListItem';
ListItem.propTypes = {
  itemViewModel: PropTypes.shape({
    guid: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    isBeingEdited: PropTypes.bool.isRequired,
  }).isRequired,
  onToggleBeingEdited: PropTypes.func.isRequired,
};
