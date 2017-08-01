import React from 'react';
import PropTypes from 'prop-types';

export const ListItemDisplay = ({ itemViewModel, onClick }) => (
  <span onClick={onClick}>{itemViewModel.value}</span>
);

ListItemDisplay.displayName = 'ListItemDisplay';

ListItemDisplay.propTypes = {
  onClick: PropTypes.func.isRequired,
  itemViewModel: PropTypes.shape({
    guid: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    isBeingEdited: PropTypes.bool.isRequired,
  }).isRequired,
};
