import * as React from 'react';
import * as PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';

import { ListItemCreator } from './ListItemCreator';
import { ListItem } from '../containers/ListItem';
import { keyMap } from '../constants/keyMap';

import { Store } from '../reducers/stores';

export interface IListDataProps {
  itemIds: Store.IIds;
}

export interface IListCallbacksProps {
  onCreateItem: (value?: string) => void;
  onFetchData: () => void;
}

export type ListProps = IListDataProps & IListCallbacksProps;


class List extends React.PureComponent<ListProps> {
  static displayName = 'List';

  static propTypes = {
    itemIds: PropTypes.any.isRequired,
    onCreateItem: PropTypes.func.isRequired,
    onFetchData: PropTypes.func.isRequired,
  };

  componentWillMount(): void {
    this.props.onFetchData();
  }

  render(): JSX.Element {
    return (
      <HotKeys keyMap={keyMap as any}>
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <ol className="list">
              {this.props.itemIds.map(id => (
                <li key={id}>
                  <ListItem id={id!} />
                </li>))}
            </ol>
            <ListItemCreator onCreateItem={this.props.onCreateItem} />
          </div>
        </div>
      </HotKeys>
    );
  }
}

export { List };
