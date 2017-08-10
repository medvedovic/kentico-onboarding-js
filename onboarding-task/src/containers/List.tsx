import { connect } from 'react-redux';

import { List as ListComponent } from '../components/List';
import { createItem } from '../actions/publicActions';

import { Store } from '../interfaces';


const mapStateToProps = ({ items }: Store.Root) => ({
  itemIds: items.ids,
});

const mapDispatchToProps = (dispatch: any) => ({
  onCreateItem: (value: string) => dispatch(createItem(value)),
});

export const List = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListComponent);
