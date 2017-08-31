import * as React from 'react';
import * as PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import { List as ImmutableList } from 'immutable';

import { ListItemCreator } from './ListItemCreator';
import { ListItem } from '../containers/ListItem';
import { keyMap } from '../constants/keyMap';

import { Store } from '../reducers/stores';
import { Loader } from './Loader';
// import { fetchIsLoading } from '../actions/actionCreators';
// import { Dispatch } from 'react-redux';


export interface IListDataProps {
  itemIds: Store.IIds;
  showLoader: boolean;
}

export interface IListCallbacksProps {
  onCreateItem: (value?: string) => void;
  onFetchItemsIsLoading: (value: boolean) => void;
}

export type ListProps = IListDataProps & IListCallbacksProps;


class List extends React.PureComponent<ListProps> {
  static displayName = 'List';

  static propTypes = {
    itemIds: PropTypes.instanceOf(ImmutableList).isRequired,
    showLoader: PropTypes.bool.isRequired,
    onCreateItem: PropTypes.func.isRequired,
    onFetchItemsIsLoading: PropTypes.func.isRequired,
  };

  constructor(props: ListProps) {
    super(props);
  }

  componentWillMount() {
    // api call
    this.props.onFetchItemsIsLoading(true);
  }

  render() {
    return (
      <HotKeys keyMap={keyMap}>
        {
          this.props.showLoader &&
          <Loader />
        }
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <ol className="list">
              {
                this.props.itemIds.map((id: string) => (
                  <li key={id}>
                    <ListItem id={id} />
                  </li>
                ))
              }
            </ol>
            <ListItemCreator onCreateItem={this.props.onCreateItem} />
          </div>
        </div>
      </HotKeys>
    );
  }
}

export { List };
