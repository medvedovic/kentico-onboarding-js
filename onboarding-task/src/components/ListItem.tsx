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
  onUpdateItem: (value: string) => void;
  onUpdateData: (value: string) => void;
  onToggleBeingEdited: () => void;
}

export type ListItemProps = IListItemDataProps & IListItemCallbacksProps;

const ListItem: React.SFC<ListItemProps> = ({ itemViewModel, onToggleBeingEdited, onUpdateItem, onUpdateData, onDeleteData }) => (
  itemViewModel.isBeingEdited
    ? <ListItemEditor
      onUpdateData={onUpdateData}
      itemViewModel={itemViewModel}
      onCancelEdit={onToggleBeingEdited}
      onUpdateItem={onUpdateItem}
      onDeleteData={onDeleteData}
    />
    : <ListItemDisplay
      value={itemViewModel.value}
      onClick={onToggleBeingEdited}
    />
);

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
  itemViewModel: PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    localId: PropTypes.string.isRequired,
    isBeingEdited: PropTypes.bool.isRequired,
  }).isRequired,
  onToggleBeingEdited: PropTypes.func.isRequired,
  onUpdateItem: PropTypes.func.isRequired,
  onDeleteData: PropTypes.func.isRequired,
};

export { ListItem };
