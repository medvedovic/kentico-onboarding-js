import { connect } from 'react-redux';

import { ListItemEditor } from '../components/ListItemEditor';
import { deleteItem, updateItem } from '../actions/userActions';

const mapDispatchToProps = (dispatch, props) => ({
  onUpdateItem: (value) => dispatch(updateItem(props.itemViewModel.guid, value)),
  onDeleteItem: () => dispatch(deleteItem(props.itemViewModel.guid)),
});

export const ListItemEditorContainer = connect(
  undefined,
  mapDispatchToProps
)(ListItemEditor);

ListItemEditorContainer.displayName = 'ListItemEditorContainer';
