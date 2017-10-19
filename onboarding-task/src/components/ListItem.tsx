import * as React from 'react';
import * as PropTypes from 'prop-types';

import { ListItemDisplay } from './ListItemDisplay';
import { ListItemEditor } from './ListItemEditor';
import { IItemViewModel } from '../models/IItemViewModel';

export interface IListItemDataProps {
  itemViewModel: IItemViewModel;
}

export interface IListItemCallbacksProps {
  onDeleteData: () => void;
  onUpdateData: (value: string) => void;
  onToggleBeingEdited: () => void;
  onResendRequest: (method: string) => void;
}

export type ListItemProps = IListItemDataProps & IListItemCallbacksProps;

const ListItem: React.SFC<ListItemProps> = ({ itemViewModel, onToggleBeingEdited, onUpdateData, onDeleteData, onResendRequest }) => (
  itemViewModel.isBeingEdited
    ? <ListItemEditor
      onUpdateData={onUpdateData}
      itemViewModel={itemViewModel}
      onCancelEdit={onToggleBeingEdited}
      onDeleteData={onDeleteData}
    />
    : <ListItemDisplay
      isSavedSuccess={itemViewModel.isSavedSuccess}
      value={itemViewModel.value}
      method={itemViewModel.failedHttpAction}
      onClick={onToggleBeingEdited}
      onResendRequest={onResendRequest}
    />
);

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
  itemViewModel: PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string.isRequired,
    localId: PropTypes.string.isRequired,
    isBeingEdited: PropTypes.bool.isRequired,
  }).isRequired,
  onToggleBeingEdited: PropTypes.func.isRequired,
  onDeleteData: PropTypes.func.isRequired,
};

export { ListItem };
