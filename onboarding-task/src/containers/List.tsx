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

// interface IOwnProps {
//   apiEndpoint: string;
// }

const mapDispatchToProps = (dispatch: any, { apiEndpoint }: any): IListCallbacksProps => ({
  onCreateItem: (value: string) => dispatch(postData(apiEndpoint, value)),
  onFetchData: () => dispatch(fetchData(apiEndpoint)),
});

export const List = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListComponent);
