import * as React from 'react';
import * as PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';

import { isTextInputValid } from '../utils/isTextInputValid';

interface IListItemCreatorCallbacksProps {
  onCreateItem: (value: string) => void;
}

interface IListItemCreatorState {
  value: string;
}

class ListItemCreator extends React.PureComponent<IListItemCreatorCallbacksProps, IListItemCreatorState> {
  static displayName = 'ListItemInput';

  static propTypes = {
    onCreateItem: PropTypes.func.isRequired,
  };

  private errorElement: any;
  private textInput: any;

  constructor(props: IListItemCreatorCallbacksProps) {
    super(props);

    this.state = {
      value: '',
    };
  }

  _onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { value } = this.state;

    setTimeout(() => {
      this.errorElement.classList.remove('shake');
    },         300);

    if (isTextInputValid(value)) {
      this.props.onCreateItem(value);
      this._hideErrorMessage();
    } else {
      this.errorElement.classList.add('shake');
      this.errorElement.style.display = 'block';
    }

    this._resetInput();
  };

  _handleInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    this.setState(() => ({
      value,
    }));
  };

  _resetInput = () => {
    this.setState(() => ({
      value: '',
    }));
  };

  _hideErrorMessage = () => {
    this.errorElement.style.display = 'none';
  };

  render() {
    const { value } = this.state;
    const globalHandlers = {
      'focusNewItemKey': () => this.textInput.focus(),
    };
    const handlers = {
      'cancelKey': () => this.textInput.blur(),
    };

    return (
      <div onBlur={this._hideErrorMessage}>
        <HotKeys handlers={globalHandlers} focused={true} attach={document} />
        <HotKeys handlers={handlers} >
          <div className="col-sm-12 top-offset">
            <form onSubmit={this._onSubmitForm}>
              <div className="input-group">
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-default btn-add">Add</button>
                </span>
                <input
                  type="text"
                  className="form-control enlarge"
                  onChange={this._handleInputChanged}
                  value={value}
                  ref={(input) => {
                    this.textInput = input;
                  }}
                />
              </div>
            </form>
            <div
              className="error add-input-error"
              ref={div => {
                this.errorElement = div;
              }}
            >Invalid input!</div>
          </div>
        </HotKeys>
      </div>
    );
  }
}

export { ListItemCreator };
