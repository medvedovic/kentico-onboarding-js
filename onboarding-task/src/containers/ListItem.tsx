import { connect } from 'react-redux';

import { ListItem as ListItemComponent } from '../components/ListItem';
import {
  toggleBeingEdited,
  updateItem,
  repostData,
  putData,
  deleteData
} from '../actions/publicActions';
import { memoizedCreateViewModel } from '../utils/createViewModel';

import {
  IListItemDataProps as IListItemComponentDataProps,
  IListItemCallbacksProps as IListItemComponentCallbacksProps
} from '../components/ListItem';

import { Store } from '../reducers/stores';

interface IOwnProps {
  localId: string;
  apiEndpoint: string;
}

const mapStateToProps = ({ items }: Store.IRoot, { localId }: IOwnProps): IListItemComponentDataProps => {
  const item = items.data.get(localId);
  const flags = items.flags.get(localId);

  return { itemViewModel: memoizedCreateViewModel(item, flags) };
};

const mapDispatchToProps = (dispatch: any, { apiEndpoint, localId }: IOwnProps): IListItemComponentCallbacksProps => ({
  onUpdateItem: (value: string) => dispatch(updateItem(localId, value)),
  onUpdateData: (value: string) => dispatch(putData(localId, value)),
  onDeleteData: () => (dispatch(deleteData(apiEndpoint, localId))),
  onToggleBeingEdited: () => dispatch(toggleBeingEdited(localId)),
  onRepostData: () => (dispatch(repostData(localId)))
});

export const ListItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItemComponent);

