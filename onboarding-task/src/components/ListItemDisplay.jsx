import React from 'react';
import PropTypes from 'prop-types';

const ListItemDisplay = ({ value, onClick }) => (
  <span onClick={onClick}>{value}</span>
);

ListItemDisplay.displayName = 'ListItemDisplay';

ListItemDisplay.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export { ListItemDisplay };
