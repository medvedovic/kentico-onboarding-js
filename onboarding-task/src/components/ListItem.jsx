import React from 'react';
import PropTypes from 'prop-types';
import { ListItemEditor } from './ListItemEditor';
import { ListItemDisplay } from './ListItemDisplay';

export class ListItem extends React.PureComponent {
  static displayName = 'displayName';
  static propTypes = {
    id: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
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
    this._toggleBeingEdited();
    this.props.onUpdateItem(this.props.id, value);
  };

  _handleDeleteItemClick = () => {
    this.props.onDeleteItem(this.props.id);
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
          itemName={item.itemName}
          onItemUpdate={this._handleUpdateItemClick}
          onItemCancelEdit={this._toggleBeingEdited}
          onItemDelete={this._handleDeleteItemClick}
        />
      );
    }

    return <ListItemDisplay item={item} onClick={this._toggleBeingEdited} />;
  }
}
