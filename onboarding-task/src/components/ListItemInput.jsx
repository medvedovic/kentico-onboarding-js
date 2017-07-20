import React from 'react';
import PropTypes from 'prop-types';

export class ListItemInput extends React.PureComponent {
  static displayName = 'ListItemInput';
  static propTypes = {
    onCreateItem: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', (event) => {
      if ((event.keyCode === 13) && this.state.value && document.activeElement === this.textInput) {
        this._handleCreateItemClick();
      }
    });
  }

  _handleInputChanged = (e) => {
    const value = e.target.value;
    this.setState(() => {
      return {
        value,
      };
    });
  };

  _handleCreateItemClick = () => {
    if (!this.state.value) {
      return;
    }
    this.props.onCreateItem(this.state.value);
    this.setState(() => {
      return {
        value: '',
      };
    });
  };

  render() {
    const { value } = this.state;
    return (
      <div className="col-lg-6">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            onChange={this._handleInputChanged}
            value={value}
            ref={(input) => {
              this.textInput = input;
            }}
          />
          <span className="input-group-btn">
            <button type="button" className="btn btn-default" onClick={this._handleCreateItemClick}>Add</button>
          </span>
        </div>
      </div>
    );
  }
}
