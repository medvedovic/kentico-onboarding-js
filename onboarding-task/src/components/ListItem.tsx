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
  onRepostData: () => void;
}

export type ListItemProps = IListItemDataProps & IListItemCallbacksProps;

const ListItem: React.SFC<ListItemProps> = ({ itemViewModel, onToggleBeingEdited, onUpdateData, onDeleteData, onRepostData }) => (
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
      onClick={onToggleBeingEdited}
      onRepostData={onRepostData}
    />
);

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
  itemViewModel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    localId: PropTypes.string.isRequired,
    isBeingEdited: PropTypes.bool.isRequired,
  }).isRequired,
  onToggleBeingEdited: PropTypes.func.isRequired,
  onDeleteData: PropTypes.func.isRequired,
};

export { ListItem };
