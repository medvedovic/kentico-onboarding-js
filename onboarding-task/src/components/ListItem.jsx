import React from 'react';
import PropTypes from 'prop-types';
import { ListItemEditor } from './ListItemEditor';
import { ListItemDisplay } from './ListItemDisplay';

export class ListItem extends React.PureComponent {
  static displayName = 'ListItem';
  static propTypes = {
    item: PropTypes.shape({
      guid: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
    onDeleteItem: PropTypes.func.isRequired,
    onUpdateItem: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isBeingEdited: false,
    };
  }

  _handleUpdateItemClick = (value) => {
    const { guid } = this.props.item;

    this._toggleBeingEdited();
    this.props.onUpdateItem(guid, value);
  };

  _handleDeleteItemClick = () => {
    const { guid } = this.props.item;

    this.props.onDeleteItem(guid);
  };

  _toggleBeingEdited = () => {
    this.setState(prevState => ({
      isBeingEdited: !prevState.isBeingEdited,
    }));
  };

  render() {
    const { isBeingEdited } = this.state;
    const { item } = this.props;

    if (isBeingEdited) {
      return (
        <ListItemEditor
          item={item}
          onItemUpdate={this._handleUpdateItemClick}
          onItemCancelEdit={this._toggleBeingEdited}
          onItemDelete={this._handleDeleteItemClick}
        />
      );
    }

    return <ListItemDisplay item={item} onClick={this._toggleBeingEdited} />;
  }
}
