import React from 'react';
import PropTypes from 'prop-types';

export class ListItemInput extends React.Component {
  static propTypes = {
    onCreateItem: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', (event) => {
      if ((event.keyCode === 13) && this.state.value) {
        this._handleCreateItemClick();
      }
    });
  }

  _handleInputChanged = (e) => {
    this.setState({ value: e.target.value });
  };

  _handleCreateItemClick = () => {
    if (!this.state.value) {
      return;
    }
    this.props.onCreateItem(this.state.value);
    this.setState({
      value: '',
    });
  };

  render() {
    return (
      <div className="col-lg-6">
        <div className="input-group">
          <input type="text" className="form-control" onChange={this._handleInputChanged} value={this.state.value} />
          <span className="input-group-btn">
            <button type="button" className="btn btn-default" onClick={this._handleCreateItemClick}>Add</button>
          </span>
        </div>
      </div>
    );
  }
}
