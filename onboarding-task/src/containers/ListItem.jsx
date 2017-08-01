import { ListItem } from '../components/ListItem';
import { connect } from 'react-redux';
import { toggleBeingEdited } from '../actions/userActions';
import { memoizedMergeItemDataWithFlags } from '../utils/mergeItemDataWithFlags';

const mapStateToProps = (store, props) => {
  const { guid, value } = store.items.get(props.guid);
  const { isBeingEdited } = store.flags.get(props.guid);

  return { itemViewModel: memoizedMergeItemDataWithFlags(guid, value, isBeingEdited) };
};

const mapDispatchToProps = (dispatch) => ({
  onToggleBeingEdited: (itemGuid) => dispatch(toggleBeingEdited(itemGuid)),
});

export const ListItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItem);

ListItemContainer.displayName = 'ListItemContainer';
