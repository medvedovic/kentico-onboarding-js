import { connect } from 'react-redux';

import { List as ListComponent } from '../components/List';
import { createItem } from '../actions/publicActions';

const mapStateToProps = ({ items }) => ({
  itemIds: items.ids.toArray(),
});

const mapDispatchToProps = (dispatch) => ({
  onCreateItem: (value) => dispatch(createItem(value)),
});

export const List = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListComponent);
