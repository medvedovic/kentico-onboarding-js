import { List } from '../components/List';
import { connect } from 'react-redux';
import { createItem, toggleBeingEdited } from '../actions/userActions';

const mapStateToProps = (store) => ({
  items: store.items,
  itemsBeingEdited: store.itemsBeingEdited,
});

const mapDispatchToProps = (dispatch) => ({
  onCreateItem: (value) => dispatch(createItem(value)),
  onToggleBeingEdited: (itemGuid) => dispatch(toggleBeingEdited(itemGuid)),
});

export const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

ListContainer.displayName = 'ListContainer';
