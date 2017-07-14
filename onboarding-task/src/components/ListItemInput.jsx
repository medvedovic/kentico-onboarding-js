import React from 'react';
import PropTypes from 'prop-types';

export default class ListItemInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.handleCreateItemClick = this.handleCreateItemClick.bind(this);
    this.handleInputChanged = this.handleInputChanged.bind(this);
  }
  handleInputChanged(e) {
    this.setState({ value: e.target.value });
  }
  handleCreateItemClick() {
    if (!this.state.value) {
      return;
    }
    this.props.onCreateItem(this.state.value);
    this.setState({
      value: '',
    });
  }
  render() {
    return (
      <div className="col-lg-6">
        <div className="input-group">
          <input type="text" className="form-control" onChange={this.handleInputChanged} value={this.state.value} />
          <span className="input-group-btn">
            <button type="button" className="btn btn-default" onClick={this.handleCreateItemClick}>Add</button>
          </span>
        </div>
      </div>
    );
  }
}

ListItemInput.propTypes = {
  onCreateItem: PropTypes.func,
};

