import {connect, Dispatch } from 'react-redux';

import { ListItem as ListItemComponent } from '../components/ListItem';
import {
  toggleBeingEdited,
  updateItem,
  deleteItem,
} from '../actions/publicActions';
import { memoizedCreateViewModel } from '../utils/createViewModel';

import {
  IListItemDataProps as IListItemComponentDataProps,
  IListItemCallbacksProps as IListItemComponentCallbacksProps
} from '../components/ListItem';
import { Store } from '../interfaces';

interface IOwnProps {
  id: string;
}

const mapStateToProps = ({ items }: Store.IRoot, { id }: IOwnProps): IListItemComponentDataProps => {
  const item = items.data.get(id);
  const flags = items.flags.get(id);

  return { itemViewModel: memoizedCreateViewModel(item, flags) };
};

const mapDispatchToProps = (dispatch: Dispatch<any>, { id }: IOwnProps): IListItemComponentCallbacksProps => ({
  onDeleteItem: () => dispatch(deleteItem(id)),
  onUpdateItem: (value: string) => dispatch(updateItem(id, value)),
  onToggleBeingEdited: () => dispatch(toggleBeingEdited(id)),
});

export const ListItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItemComponent);

