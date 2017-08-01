import { ListItem } from '../components/ListItem';
import { connect } from 'react-redux';
import { toggleBeingEdited } from '../actions/userActions';
import { mergeItemDataWithFlags } from '../utils/mergeItemDataWithFlags';

const mapStateToProps = (store, props) => {
  const item = store.items.get(props.guid);
  const itemFlags = store.flags.get(props.guid);

  return { itemViewModel: mergeItemDataWithFlags(item, itemFlags) };
};

const mapDispatchToProps = (dispatch) => ({
  onToggleBeingEdited: (itemGuid) => dispatch(toggleBeingEdited(itemGuid)),
});

export const ListItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItem);

ListItemContainer.displayName = 'ListItemContainer';
