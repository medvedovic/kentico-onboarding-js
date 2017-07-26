import { List } from '../components/List';
import { connect } from 'react-redux';
import { CREATE_ITEM } from '../actions/actionTypes';

const mapStateToProps = (store) => ({
  ...store,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    onCreateItem: (value) => dispatch({
      type: CREATE_ITEM,
      value,
    }),
  },
});

export const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

ListContainer.displayName = 'ListContainer';
