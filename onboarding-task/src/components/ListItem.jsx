import React from 'react';
import PropTypes from 'prop-types';
import { ListItemDisplay } from './ListItemDisplay';
import { ListItemEditorContainer } from '../containers/ListItemEditorContainer';

export class ListItem extends React.PureComponent {
  static displayName = 'ListItem';
  static propTypes = {
    itemViewModel: PropTypes.shape({
      listItemData: PropTypes.shape({
        guid: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }).isRequired,
      listItemFlag: PropTypes.shape({
        isBeingEdited: PropTypes.bool.isRequired,
      }).isRequired,
    }).isRequired,
    onToggleBeingEdited: PropTypes.func.isRequired,
  };

  _toggleBeingEdited = () => {
    const { guid } = this.props.itemViewModel.listItemData;
    this.props.onToggleBeingEdited(guid);
  };

  render() {
    const { isBeingEdited } = this.props.itemViewModel.listItemFlag;
    const { listItemData } = this.props.itemViewModel;

    if (isBeingEdited) {
      return (
        <ListItemEditorContainer
          item={listItemData}
          onCancelEdit={this._toggleBeingEdited}
        />
      );
    }

    return <ListItemDisplay item={listItemData} onClick={this._toggleBeingEdited} />;
  }
}
