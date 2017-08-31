import * as React from 'react';
import * as PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import { List as ImmutableList } from 'immutable';

import { ListItemCreator } from './ListItemCreator';
import { ListItem } from '../containers/ListItem';
import { keyMap } from '../constants/keyMap';

import { Store } from '../reducers/stores';

export interface IListDataProps {
  itemIds: Store.IIds;
}

export interface IListCallbacksProps {
  onCreateItem: (value?: string) => void;
  onFetchItemsIsLoading: (value: boolean) => void;
  onFetchHasSucceeded: (items: any) => void;
  onFetchHasFailed: (errorMessage: string) => void;
  onFetchData: (url: string) => void;
}

export type ListProps = IListDataProps & IListCallbacksProps;


class List extends React.PureComponent<ListProps> {
  static displayName = 'List';

  static propTypes = {
    itemIds: PropTypes.instanceOf(ImmutableList).isRequired,
    onCreateItem: PropTypes.func.isRequired,
    onFetchItemsIsLoading: PropTypes.func.isRequired,
  };

  constructor(props: ListProps) {
    super(props);
  }

  componentWillMount() {
    this.props.onFetchData('http://localhost:49520/api/v1/Todos');
  }

  render() {
    return (
      <HotKeys keyMap={keyMap}>
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
