import React from 'react';
import PropTypes from 'prop-types';
import { ListItemDisplay } from './ListItemDisplay';
import { ListItemEditorViewModel } from '../containers/ListItemEditorViewModel';

export class ListItem extends React.PureComponent {
  static displayName = 'ListItem';
  static propTypes = {
    item: PropTypes.shape({
      guid: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isBeingEdited: false,
    };
  }

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
        <ListItemEditorViewModel
          item={item}
          onCancelEdit={this._toggleBeingEdited}
        />
      );
    }

    return <ListItemDisplay item={item} onClick={this._toggleBeingEdited} />;
  }
}
