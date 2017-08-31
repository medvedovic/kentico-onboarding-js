import { connect } from 'react-redux';

import { IListCallbacksProps, IListDataProps, List as ListComponent } from '../components/List';
import { createItem } from '../actions/publicActions';

import { Store } from '../reducers/stores';
import {
  fetchData,
  fetchHasFailed,
  fetchHasSucceeded,
  fetchIsLoading
} from '../actions/actionCreators';


const mapStateToProps = ({ items }: Store.IRoot): IListDataProps => ({
  itemIds: items.ids,
});

const mapDispatchToProps = (dispatch: any): IListCallbacksProps => ({
  onCreateItem: (value: string) => dispatch(createItem(value)),
  onFetchItemsIsLoading: (value: boolean) => dispatch(fetchIsLoading(value)),
  onFetchHasSucceeded: (items: any) => dispatch(fetchHasSucceeded(items)),
  onFetchHasFailed: (errorMessage: string) => dispatch(fetchHasFailed(errorMessage)),
  onFetchData: (url: string) => dispatch(fetchData(url)),
});

export const List = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListComponent);
