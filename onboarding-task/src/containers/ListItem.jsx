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
  const item = store.items.byIds.get(props.guid);
  const flags = store.items.flags.get(props.guid);

  return { itemViewModel: memoizedMergeItemDataWithFlags(item, flags) };
};

const mapDispatchToProps = (dispatch, props) => {
  const { guid } = props;

  return {
    onToggleBeingEdited: () => dispatch(toggleBeingEdited(guid)),
    onUpdateItem: (value) => dispatch(updateItem(guid, value)),
    onDeleteItem: () => dispatch(deleteItem(guid)),
  };
};

export const ListItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItem);

ListItemContainer.displayName = 'ListItemContainer';
