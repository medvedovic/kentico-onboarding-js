import { ListItem } from '../components/ListItem';
import { connect } from 'react-redux';
import {
  toggleBeingEdited,
  updateItem,
  deleteItem,
} from '../actions/userActions';
import { memoizedMergeItemDataWithFlags } from '../utils/mergeItemDataWithFlags';
import { isTextInputValid } from '../utils/isTextInputValid';

const mapStateToProps = (store, props) => {
  const item = store.items.byIds.get(props.id);
  const flags = store.items.flags.get(props.id);

  return { itemViewModel: memoizedMergeItemDataWithFlags(item, flags) };
};

const mapDispatchToProps = (dispatch, props) => {
  const { id } = props;

  return {
    onToggleBeingEdited: () => dispatch(toggleBeingEdited(id)),
    onUpdateItem: (value) => dispatch(updateItem(id, value)),
    onDeleteItem: () => dispatch(deleteItem(id)),
  };
};

export const ListItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItem);

ListItemContainer.displayName = 'ListItemContainer';
