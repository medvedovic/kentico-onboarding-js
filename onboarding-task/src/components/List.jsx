import React, { Component } from 'react';
import assignment from './../../../assignment.gif';
import PropTypes from 'prop-types';

import TsComponent from './TsComponent.tsx';
import ListItem from './ListItem.jsx';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = { items: this.props.items };
    this.deleteItem = this.deleteItem.bind(this);
  }
  deleteItem(key) {
    const newArray = this.props.items.filter(item => item.id !== key);
    this.setState({ items: newArray });
  }
  render() {
    const items = this.state.items;
    return (
      <div className="row">
        {/* TODO: You can delete the assignment part once you do not need it */}
        {false && <div className="row">
          <div className="col-sm-12 text-center">
            <TsComponent name="𝕱𝖆𝖓𝖈𝖞" />
          </div>
        </div>}

        <div className="row">
          <div className="col-sm-12">
            {false && <p className="lead text-center">Desired functionality is captured on the gif image. </p>}
            {false && <p className="lead text-center"><b>Note: </b>Try to make solution easily extensible (e.g. more displayed fields per item).</p>}
            <img src={assignment} alt="assignment" className="img--assignment" />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-offset-2 col-md-8">
            <ol className="list">
              {
                items.map((item) => <ListItem key={item.id.toString()} id={item.id} itemName={item.itemName} onDeleteItem={this.deleteItem} />)
              }
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

List.propTypes = {
  items: PropTypes.array,
};

export default List;
