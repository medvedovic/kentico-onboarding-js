import { ListItem } from '../components/ListItem';
import { connect } from 'react-redux';
import { toggleBeingEdited } from '../actions/userActions';
import { memoizedMergeItemDataWithFlags } from '../utils/mergeItemDataWithFlags';

const mapStateToProps = (store, props) => {
  const item = store.items.byIds.get(props.guid);
  const flags = store.items.flags.get(props.guid);

  return { itemViewModel: memoizedMergeItemDataWithFlags(item, flags) };
};

const mapDispatchToProps = (dispatch, props) => {
  const { guid } = props;

  return {
    onToggleBeingEdited: () => dispatch(toggleBeingEdited(guid)),
  };
};

export const ListItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItem);

ListItemContainer.displayName = 'ListItemContainer';
