import React from 'react';
import PropTypes from 'prop-types';

export const ListItemDisplay = (props) => {
  return (
    <span onClick={props.onClick}>{props.item.value}</span>
  );
};

ListItemDisplay.displayName = 'ListItemDisplay';

ListItemDisplay.propTypes = {
  onClick: PropTypes.func.isRequired,
  item: PropTypes.shape({
    value: PropTypes.string.isRequired,
  }).isRequired,
};
