import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ListItemDisplay } from './ListItemDisplay';
import { ListItemEditor } from './ListItemEditor';
import { ListItemDisplayWithRedo } from './ListItemDisplayWithRedo';
import { ItemViewModel, ItemViewModelPropTypeShape } from '../../models/ItemViewModel';

export interface IListItemDataProps {
  itemViewModel: ItemViewModel;
}

export interface IListItemCallbacksProps {
  onDeleteItem: () => void;
  onUpdateItem: (value: string) => void;
  onToggleBeingEdited: () => void;
  onResendRequest: (method: string) => void;
}

export type ListItemProps = IListItemDataProps & IListItemCallbacksProps;

const ListItem: React.FC<ListItemProps> = ({
                                             itemViewModel,
                                             onToggleBeingEdited,
                                             onUpdateItem,
                                             onDeleteItem,
                                             onResendRequest,
                                           }) => {
  if (itemViewModel.isBeingEdited) {
    return (
      <ListItemEditor
        onUpdateItem={onUpdateItem}
        itemViewModel={itemViewModel}
        onCancelEdit={onToggleBeingEdited}
        onDeleteItem={onDeleteItem}
      />
    );
  }

  if (!itemViewModel.isSavedSuccess) {
    return (
      <ListItemDisplayWithRedo
        value={itemViewModel.value}
        method={itemViewModel.failedHttpAction}
        onResendRequest={onResendRequest}
      />
    );
  }

  return (
    <ListItemDisplay
      isSavedSuccess={itemViewModel.isSavedSuccess}
      value={itemViewModel.value}
      method={itemViewModel.failedHttpAction}
      onClick={onToggleBeingEdited}
      onResendRequest={onResendRequest}
    />
  );
};

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
  itemViewModel: PropTypes.shape(ItemViewModelPropTypeShape).isRequired,
  onToggleBeingEdited: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onUpdateItem: PropTypes.func.isRequired,
};

export { ListItem };
