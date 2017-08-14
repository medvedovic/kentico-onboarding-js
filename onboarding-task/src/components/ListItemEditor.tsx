import * as React from 'react';
import * as PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';

import { isTextInputValid } from '../utils/isTextInputValid';

import { IItemViewModel } from '../interfaces';

export interface IListItemEditorDataProps {
  itemViewModel: IItemViewModel;
}

export interface IListItemEditorCallbacksProps {
  onCancelEdit: () => void;
  onUpdateItem: (value: string) => void;
  onDeleteItem: () => void;
}

type listItemEditorProps = IListItemEditorDataProps & IListItemEditorCallbacksProps;

interface IListItemEditorState {
  value: string;
}

class ListItemEditor extends React.PureComponent<listItemEditorProps, IListItemEditorState> {
  static displayName = 'ListItemEditor';

  static propTypes = {
    itemViewModel: PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      isBeingEdited: PropTypes.bool.isRequired,
    }).isRequired,
    onUpdateItem: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
    onCancelEdit: PropTypes.func.isRequired,
  };

  constructor(props: listItemEditorProps) {
    super(props);

    this.state = {
      value: props.itemViewModel.value,
    };
  }

  _handleItemNameChanged = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(() => ({
      value,
    }));
  };

  _handleUpdate = () => {
    const { value } = this.state;

    if (isTextInputValid(value)) {
      this.props.onUpdateItem(value);
      this.props.onCancelEdit();
    }
  };

  render(): JSX.Element {
    const { onCancelEdit } = this.props;
    const handlers = {
      'saveKey': this._handleUpdate,
      'cancelKey': onCancelEdit,
    };

    return (
      <HotKeys handlers={handlers} >
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={this.state.value}
            onChange={this._handleItemNameChanged}
            autoFocus
          />
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-default" onClick={this._handleUpdate}>Save</button>
            <button type="button" className="btn btn-default" onClick={onCancelEdit}>Cancel</button>
            <button type="button" className="btn btn-default" onClick={this.props.onDeleteItem}>Delete</button>
          </div>
        </div>
        {!this.state.value &&
          <span className="error shake">Invalid input!</span>
        }

      </HotKeys>
    );
  }
}

export { ListItemEditor };

