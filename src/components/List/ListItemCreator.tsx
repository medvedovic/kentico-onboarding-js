import * as React from 'react';
import * as PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';

import { isTextInputValid } from '../../utils/isTextInputValid';
import { IKeyMapHandlers } from '../../constants/keyMap';

interface IListItemCreatorCallbacksProps {
  onCreateItem: (value: string) => void;
}

interface IListItemCreatorState {
  value: string;
  showError: boolean;
}

class ListItemCreator extends React.PureComponent<IListItemCreatorCallbacksProps, IListItemCreatorState> {
  static displayName = 'ListItemInput';

  static propTypes = {
    onCreateItem: PropTypes.func.isRequired,
  };

  private textInput: HTMLInputElement | null;

  constructor(props: IListItemCreatorCallbacksProps) {
    super(props);

    this.state = {
      value: '',
      showError: false,
    };
  }

  _onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { value } = this.state;

    if (isTextInputValid(value)) {
      this.props.onCreateItem(value);
    }

    this._resetInput();
  };

  _handleInputChanged = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(() => ({
      value,
      showError: !value,
    }));
  };

  _hideError = () => {
    this.setState(() => ({
      showError: false,
    }));
  };

  _resetInput = () => {
    this.setState(() => ({
      value: '',
    }));
  };

  render(): JSX.Element {
    const { value } = this.state;
    const globalHandlers: Partial<IKeyMapHandlers> = {
      focusNewItemKey: () => {
        if (this.textInput) {
          this.textInput.focus();
        }
      },
    };
    const handlers: Partial<IKeyMapHandlers> = {
      cancelKey: () => {
        if (this.textInput) {
          this.textInput.blur();
        }
      },
    };

    return (
      <div>
        <HotKeys
          handlers={globalHandlers as any}
          focused={true}
          attach={document as any}
        />
        <HotKeys handlers={handlers as any}>
          <div className="col-sm-12 top-offset">
            <form onSubmit={this._onSubmitForm}>
              <div className="input-group">
                <span className="input-group-btn">
                  <button
                    type="submit"
                    className="btn btn-default btn-add no-border-radius btn-custom"
                    disabled={!value}
                  >
                    Add
                  </button>
                </span>
                <input
                  type="text"
                  className="form-control enlarge main-input no-border-radius"
                  onChange={this._handleInputChanged}
                  onBlur={this._hideError}
                  value={value}
                  ref={input => this.textInput = input}
                />
              </div>
            </form>
            {this.state.showError && (
              <div className="error add-input-error shake">
                Invalid input !
              </div>
            )}
          </div>
        </HotKeys>
      </div>
    );
  }
}

export { ListItemCreator };
