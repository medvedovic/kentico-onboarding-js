import React from 'react';
import PropTypes from 'prop-types';
import { ListItemDisplay } from './ListItemDisplay';
import { ListItemEditorContainer } from '../containers/ListItemEditor';

export class ListItem extends React.PureComponent {
  static displayName = 'ListItem';
  static propTypes = {
    itemViewModel: PropTypes.shape({
      guid: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      isBeingEdited: PropTypes.bool.isRequired,
    }).isRequired,
    onToggleBeingEdited: PropTypes.func.isRequired,
  };

  _toggleBeingEdited = () => {
    const { guid } = this.props;

    this.props.onToggleBeingEdited(guid);
  };

  render() {
    const { itemViewModel } = this.props;
    const { isBeingEdited } = itemViewModel;

    if (isBeingEdited) {
      return (
        <ListItemEditorContainer
          itemViewModel={itemViewModel}
          onCancelEdit={this._toggleBeingEdited}
        />
      );
    }

    return <ListItemDisplay itemViewModel={itemViewModel} onClick={this._toggleBeingEdited} />;
  }
}
