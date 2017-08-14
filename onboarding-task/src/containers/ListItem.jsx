import { connect } from 'react-redux';

import { ListItem as ListItemComponent } from '../components/ListItem';
import {
  toggleBeingEdited,
  updateItem,
  deleteItem,
} from '../actions/publicActions';
import { memoizedCreateViewModel } from '../utils/createViewModel';

const mapStateToProps = ({ items }, { id }) => {
  const item = items.data.get(id);
  const flags = items.flags.get(id);

  return { itemViewModel: memoizedCreateViewModel(item, flags) };
};

const mapDispatchToProps = (dispatch, { id }) => ({
  onToggleBeingEdited: () => dispatch(toggleBeingEdited(id)),
  onUpdateItem: (value) => dispatch(updateItem(id, value)),
  onDeleteItem: () => dispatch(deleteItem(id)),
});

export const ListItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItemComponent);

