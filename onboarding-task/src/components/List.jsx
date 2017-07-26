import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ListItem } from './ListItem.jsx';
import { ListItemInput } from './ListItemInput';
import * as UserActions from '../actions/userActions';
import { OrderedMap } from 'immutable';

// class List extends React.PureComponent {
//   static displayName = 'List';
//
//   render() {
//     const { items } = this.props;
//
//     console.log(this.props);
//
//     return (
//       <div className="row">
//         <div className="col-sm-12 col-md-6">
//           <ol className="list">
//             {
//               items.map((item, key) => (
//                 <li key={key}>
//                   <ListItem
//                     id={key}
//                     item={item}
//                     onUpdateItem={this.props.actions.updateItem}
//                     onDeleteItem={this.props.actions.deleteItem}
//                   />
//                 </li>
//               ))
//             }
//           </ol>
//           <ListItemInput onCreateItem={this.props.actions.createItem} />
//         </div>
//       </div>
//     );
//   }
// }

const List = ({ items, actions }) => (
  <div className="row">
    <div className="col-sm-12 col-md-6">
      <ol className="list">
        {
          items.map((item, key) => (
            <li key={key}>
              <ListItem
                id={key}
                item={item}
                onUpdateItem={actions.updateItem}
                onDeleteItem={actions.deleteItem}
              />
            </li>
          ))
        }
      </ol>
      <ListItemInput onCreateItem={actions.createItem} />
    </div>
  </div>
);

List.propTypes = {
  items: PropTypes.instanceOf(OrderedMap),
  actions: PropTypes.shape({
    createItem: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (store) => ({
  ...store,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(UserActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
