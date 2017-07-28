import { List } from '../components/List';
import { connect } from 'react-redux';
import { createItem, toggleBeingEdited } from '../actions/userActions';
import { ListItemViewModel } from '../models/ListItemViewModel';

const mergeItemDataWithFlags = (items, flags) => (
  items.map((item) => (
    new ListItemViewModel({
      listItemData: item,
      listItemFlag: flags.get(item.guid),
    })
  ))
);

const mapStateToProps = (store) => ({
  itemsViewModel: mergeItemDataWithFlags(store.items, store.itemsBeingEdited),
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
