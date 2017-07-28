import React from 'react';
import PropTypes from 'prop-types';
import { ListItemDisplay } from './ListItemDisplay';
import { ListItemEditorContainer } from '../containers/ListItemEditorContainer';

export class ListItem extends React.PureComponent {
  static displayName = 'ListItem';
  static propTypes = {
    item: PropTypes.shape({
      guid: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
    isBeingEdited: PropTypes.bool.isRequired,
    onToggleBeingEdited: PropTypes.func.isRequired,
  };

  _toggleBeingEdited = () => {
    const { guid } = this.props.item;
    this.props.onToggleBeingEdited(guid);
  };

  render() {
    const { isBeingEdited } = this.props;
    const { item } = this.props;

    if (isBeingEdited) {
      return (
        <ListItemEditorContainer
          item={item}
          onCancelEdit={this._toggleBeingEdited}
        />
      );
    }

    return <ListItemDisplay item={item} onClick={this._toggleBeingEdited} />;
  }
}
