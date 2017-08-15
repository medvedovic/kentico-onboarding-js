import { connect, Dispatch } from 'react-redux';

import { IListCallbacksProps, IListDataProps, List as ListComponent } from '../components/List';
import { createItem } from '../actions/publicActions';

import { Store } from '../interfaces';


const mapStateToProps = ({ items }: Store.IRoot): IListDataProps => ({
  itemIds: items.ids,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): IListCallbacksProps => ({
  onCreateItem: (value: string) => dispatch(createItem(value)),
});

export const List = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListComponent);
