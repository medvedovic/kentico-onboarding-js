import { connect } from 'react-redux';

import { ListItem as ListItemComponent } from '../components/ListItem';
import {
  toggleBeingEdited,
  updateItem,
  deleteItem,
} from '../actions/publicActions';
import { memoizedCreateViewModel } from '../utils/createViewModel';

import { Store } from '../interfaces';

interface IListItemDataProps {
  id: string;
}

const mapStateToProps = ({ items }: Store.Root, { id }: IListItemDataProps) => {
  const item = items.data.get(id);
  const flags = items.flags.get(id);

  return { itemViewModel: memoizedCreateViewModel(item, flags) };
};

const mapDispatchToProps = (dispatch: any, { id }: IListItemDataProps) => ({
  onToggleBeingEdited: () => dispatch(toggleBeingEdited(id)),
  onUpdateItem: (value: string) => dispatch(updateItem(id, value)),
  onDeleteItem: () => dispatch(deleteItem(id)),
});

export const ListItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItemComponent);

