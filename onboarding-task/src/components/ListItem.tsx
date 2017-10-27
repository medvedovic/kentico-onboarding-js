import * as React from 'react';
import * as PropTypes from 'prop-types';

import { ListItemDisplay } from './ListItemDisplay';
import { ListItemEditor } from './ListItemEditor';
import { IItemViewModel } from '../models/IItemViewModel';
import { ListItemDisplayWithRedo } from './ListItemDisplayWithRedo';

export interface IListItemDataProps {
  itemViewModel: IItemViewModel;
}

export interface IListItemCallbacksProps {
  onDeleteItem: () => void;
  onUpdateItem: (value: string) => void;
  onToggleBeingEdited: () => void;
  onResendRequest: (method: string) => void;
}

export type ListItemProps = IListItemDataProps & IListItemCallbacksProps;

const ListItem: React.SFC<ListItemProps> = ({ itemViewModel, onToggleBeingEdited, onUpdateItem, onDeleteItem, onResendRequest }) => (
  itemViewModel.isBeingEdited
    ? <ListItemEditor
      onUpdateItem={onUpdateItem}
      itemViewModel={itemViewModel}
      onCancelEdit={onToggleBeingEdited}
      onDeleteItem={onDeleteItem}
    />
    : itemViewModel.isSavedSuccess ?
    <ListItemDisplay
      isSavedSuccess={itemViewModel.isSavedSuccess}
      value={itemViewModel.value}
      method={itemViewModel.failedHttpAction}
      onClick={onToggleBeingEdited}
      onResendRequest={onResendRequest}
    />
    :
    <ListItemDisplayWithRedo
      value={itemViewModel.value}
      method={itemViewModel.failedHttpAction}
      onResendRequest={onResendRequest}
    />
);

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
  itemViewModel: PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string.isRequired,
    isBeingEdited: PropTypes.bool.isRequired,
  }).isRequired,
  onToggleBeingEdited: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onUpdateItem: PropTypes.func.isRequired,
};

export { ListItem };
