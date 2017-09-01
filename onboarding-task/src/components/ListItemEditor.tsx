import * as React from 'react';
import * as PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';

import { isTextInputValid } from '../utils/isTextInputValid';

import { IItemViewModel } from '../models/IItemViewModel';
import { IKeyMapHandlers } from '../constants/keyMap';

export interface IListItemEditorDataProps {
  itemViewModel: IItemViewModel;
}

export interface IListItemEditorCallbacksProps {
  onCancelEdit: () => void;
  onUpdateItem: (value: string) => void;
  onDeleteData: () => void;
}

type ListItemEditorProps = IListItemEditorDataProps & IListItemEditorCallbacksProps;

interface IListItemEditorState {
  value: string;
}

class ListItemEditor extends React.PureComponent<ListItemEditorProps, IListItemEditorState> {
  static displayName = 'ListItemEditor';

  static propTypes = {
    itemViewModel: PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      isBeingEdited: PropTypes.bool.isRequired,
    }).isRequired,
    onUpdateItem: PropTypes.func.isRequired,
    onDeleteData: PropTypes.func.isRequired,
    onCancelEdit: PropTypes.func.isRequired,
  };

  constructor(props: ListItemEditorProps) {
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
    const handlers: Partial<IKeyMapHandlers> = {
      saveKey: this._handleUpdate,
      cancelKey: onCancelEdit,
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
            <button type="button" className="btn btn-default" onClick={this.props.onDeleteData}>Delete</button>
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

