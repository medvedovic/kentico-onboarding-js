import { connect } from 'react-redux';
import { List } from '../components/List';
import { createItem } from '../actions/userActions';

const mapStateToProps = ({ items }) => ({
  itemIds: items.ids.toArray(),
});

const mapDispatchToProps = (dispatch) => ({
  onCreateItem: (value) => dispatch(createItem(value)),
});

export const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

ListContainer.displayName = 'ListContainer';
