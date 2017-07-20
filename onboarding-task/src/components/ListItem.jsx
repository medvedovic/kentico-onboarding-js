import React from 'react';
import PropTypes from 'prop-types';
import { ListItemEditor } from './ListItemEditor';
import { ListItemDisplay } from './ListItemDisplay';

export class ListItem extends React.PureComponent {
  static displayName = 'displayName';
  static propTypes = {
    id: PropTypes.string.isRequired,
    itemName: PropTypes.string.isRequired,
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
    const { itemName } = this.props;

    if (isBeingEdited) {
      return (
        <ListItemEditor
          itemName={itemName}
          onItemUpdate={this._handleUpdateItemClick}
          onItemCancelEdit={this._toggleBeingEdited}
          onItemDelete={this._handleDeleteItemClick}
        />
      );
    }

    return <ListItemDisplay itemName={itemName} onClick={this._toggleBeingEdited} />;
  }
}
