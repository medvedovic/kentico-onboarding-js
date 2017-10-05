import { connect } from 'react-redux';

import { IListCallbacksProps, IListDataProps, List as ListComponent } from '../components/List';

import { Store } from '../reducers/stores';
import {
  fetchData} from '../actions/actionCreators';
import { postData } from '../actions/actionCreators';


const mapStateToProps = ({ items, app }: Store.IRoot): IListDataProps => ({
  itemIds: items.ids,
  apiEndpoint: app.settings.apiEndpoint,
});

const mapDispatchToProps = (dispatch: any): IListCallbacksProps => ({
  onCreateItem: (value: string) => dispatch(postData(value)),
  onFetchData: () => dispatch(fetchData()),
});

export const List = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListComponent);
