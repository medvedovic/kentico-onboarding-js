import { connect } from 'react-redux';

import { IListCallbacksProps, IListDataProps, List as ListComponent } from '../components/List';

import { Store } from '../reducers/stores';
import {
  fetchData,
  fetchHasFailed,
  fetchHasSucceeded,
  fetchIsLoading,
  postData
} from '../actions/actionCreators';


const mapStateToProps = ({ items }: Store.IRoot): IListDataProps => ({
  itemIds: items.ids,
});

const mapDispatchToProps = (dispatch: any, ownProps: any): IListCallbacksProps => ({
  onCreateItem: (value: string) => dispatch(postData(ownProps.apiEndpoint, value)),
  onFetchItemsIsLoading: (value: boolean) => dispatch(fetchIsLoading(value)),
  onFetchHasSucceeded: (items: any) => dispatch(fetchHasSucceeded(items)),
  onFetchHasFailed: (errorMessage: string) => dispatch(fetchHasFailed(errorMessage)),
  onFetchData: () => dispatch(fetchData(ownProps.apiEndpoint)),
});

export const List = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListComponent);
