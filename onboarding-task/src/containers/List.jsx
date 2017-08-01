import { List } from '../components/List';
import { connect } from 'react-redux';
import { createItem } from '../actions/userActions';

const mapStateToProps = ({ items }) => ({
  itemIds: items.byIds.keySeq().toArray(),
});

const mapDispatchToProps = (dispatch) => ({
  onCreateItem: (value) => dispatch(createItem(value)),
});

export const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

ListContainer.displayName = 'ListContainer';
