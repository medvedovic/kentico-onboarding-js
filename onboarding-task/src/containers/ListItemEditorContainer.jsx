import { ListItemEditor } from '../components/ListItemEditor';
import { connect } from 'react-redux';
import { deleteItem, updateItem } from '../actions/userActions';

const mapDispatchToProps = (dispatch) => ({
  onUpdateItem: (guid, value) => dispatch(updateItem(guid, value)),
  onDeleteItem: (guid) => dispatch(deleteItem(guid)),
});

export const ListItemEditorContainer = connect(
  undefined,
  mapDispatchToProps
)(ListItemEditor);

ListItemEditorContainer.displayName = 'ListItemEditorViewModel';
