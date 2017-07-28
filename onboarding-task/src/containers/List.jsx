import { List } from '../components/List';
import { connect } from 'react-redux';
import { createItem } from '../actions/userActions';

const mapStateToProps = (store) => ({
  items: store.items,
});

const mapDispatchToProps = (dispatch) => ({
  onCreateItem: (value) => dispatch(createItem(value)),
});

export const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

ListContainer.displayName = 'ListContainer';
