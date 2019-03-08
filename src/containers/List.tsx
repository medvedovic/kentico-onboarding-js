import * as React from 'react';
import { connect } from 'react-redux';

import {
  IListCallbacksProps,
  IListDataProps,
  List as ListComponent,
} from '../components/List/List';
import { Store } from '../reducers/stores';
import { postData } from '../actions/dependencyInjections';
import { fetchData } from '../actions/dependencyInjections';


const mapStateToProps = ({items}: Store.IRoot): IListDataProps => ({
  itemIds: items.ids,
});

const mapDispatchToProps = (dispatch: Dispatch): IListCallbacksProps => ({
  onCreateItem: (value: string) => dispatch(postData(value)),
  onFetchData: () => dispatch(fetchData()),
});

export const List: React.ComponentClass = connect(mapStateToProps, mapDispatchToProps)(ListComponent);
