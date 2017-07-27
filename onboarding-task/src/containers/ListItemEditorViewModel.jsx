import { DELETE_ITEM, UPDATE_ITEM } from '../constants/actionTypes';
import { ListItemEditor } from '../components/ListItemEditor';
import { connect } from 'react-redux';

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

export const ListItemEditorViewModel = connect(
  undefined,
  mapDispatchToProps
)(ListItemEditor);

ListItemEditorViewModel.displayName = 'ListItemEditorViewModel';
