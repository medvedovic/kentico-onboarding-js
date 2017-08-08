import React from 'react';
import PropTypes from 'prop-types';

export const ListItemDisplay = ({ itemViewModel: { value }, onClick }) => (
  <span onClick={onClick}>{value}</span>
);

ListItemDisplay.displayName = 'ListItemDisplay';

ListItemDisplay.propTypes = {
  onClick: PropTypes.func.isRequired,
  itemViewModel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    isBeingEdited: PropTypes.bool.isRequired,
  }).isRequired,
};
