import * as React from 'react';
import * as PropTypes from 'prop-types';

import { ListItemDisplay } from './ListItemDisplay';
import { ListItemEditor } from './ListItemEditor';
import { IItemViewModel } from '../interfaces';

export interface IListItemDataProps {
  itemViewModel: IItemViewModel;
}

export interface IListCallbacksProps {
  onDeleteItem: () => void;
  onUpdateItem: (value: string) => void;
  onToggleBeingEdited: () => void;
}

export type listItemProps = IListItemDataProps & IListCallbacksProps;

const ListItem: React.SFC<listItemProps> = ({ itemViewModel, onToggleBeingEdited, onUpdateItem, onDeleteItem }) => {
  return (
    itemViewModel.isBeingEdited ?
      <ListItemEditor
        itemViewModel={itemViewModel}
        onCancelEdit={onToggleBeingEdited}
        onDeleteItem={onDeleteItem}
        onUpdateItem={onUpdateItem}
      /> :
      <ListItemDisplay
        value={itemViewModel.value}
        onClick={onToggleBeingEdited}
      />
  );
};

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
  itemViewModel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    isBeingEdited: PropTypes.bool.isRequired,
  }).isRequired,
  onToggleBeingEdited: PropTypes.func.isRequired,
  onUpdateItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
};

export { ListItem };
