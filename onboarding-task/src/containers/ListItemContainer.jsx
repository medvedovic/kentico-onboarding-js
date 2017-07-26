import { ListItem } from '../components/ListItem';
import { connect } from 'react-redux';
import {
  UPDATE_ITEM,
  DELETE_ITEM,
} from '../actions/actionTypes';

const mapDispatchToProps = (dispatch) => ({
  actions: {
    onUpdateItem: (guid, value) => dispatch({
      type: UPDATE_ITEM,
      item: {
        guid,
        value,
      },
    }),
    onDeleteItem: (guid) => dispatch({
      type: DELETE_ITEM,
      itemGuid: guid,
    }),
  },
});

export const ListItemContainer = connect(
  undefined,
  mapDispatchToProps
)(ListItem);

ListItemContainer.displayName = 'ListContainer';
