import {connect } from 'react-redux';

import { ListItem as ListItemComponent } from '../components/ListItem';
import {
  toggleBeingEdited,
  updateItem,
} from '../actions/publicActions';
import { memoizedCreateViewModel } from '../utils/createViewModel';

import {
  IListItemDataProps as IListItemComponentDataProps,
  IListItemCallbacksProps as IListItemComponentCallbacksProps
} from '../components/ListItem';
import { Store } from '../reducers/stores';
import { deleteData } from '../actions/actionCreators';

interface IOwnProps {
  id: string;
  apiEndpoint: string;
}

const mapStateToProps = ({ items }: Store.IRoot, { id }: IOwnProps): IListItemComponentDataProps => {
  const item = items.data.get(id);
  const flags = items.flags.get(id);

  return { itemViewModel: memoizedCreateViewModel(item, flags) };
};

const mapDispatchToProps = (dispatch: any, { apiEndpoint, id }: IOwnProps): IListItemComponentCallbacksProps => ({
  onUpdateItem: (value: string) => dispatch(updateItem(id, value)),
  onDeleteData: () => (dispatch(deleteData(apiEndpoint, id))),
  onToggleBeingEdited: () => dispatch(toggleBeingEdited(id)),
});

export const ListItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItemComponent);

