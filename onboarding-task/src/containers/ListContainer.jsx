import { List } from '../components/List';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActions from '../actions/userActions';

const mapStateToProps = (store) => ({
  ...store,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(UserActions, dispatch),
});

export const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

ListContainer.displayName = 'ListContainer';
