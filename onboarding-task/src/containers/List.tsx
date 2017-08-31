import { connect, Dispatch } from 'react-redux';

import { IListCallbacksProps, IListDataProps, List as ListComponent } from '../components/List';
import { createItem } from '../actions/publicActions';

import { Store } from '../reducers/stores';
import { fetchIsLoading } from '../actions/actionCreators';


const mapStateToProps = ({ items, app }: Store.IRoot): IListDataProps => ({
  itemIds: items.ids,
  showLoader: app.settings.showLoader,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): IListCallbacksProps => ({
  onCreateItem: (value: string) => dispatch(createItem(value)),
  onFetchItemsIsLoading: (value: boolean) => dispatch(fetchIsLoading(value)),
});

export const List = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListComponent);
