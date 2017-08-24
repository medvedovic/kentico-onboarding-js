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
}

export type ListProps = IListDataProps & IListCallbacksProps;

const List: React.SFC<ListProps> = ({ itemIds, onCreateItem }) => (
  <HotKeys keyMap={keyMap}>
    <div className="row">
      <div className="col-sm-12 col-md-6">
        <ol className="list">
          {
            itemIds.map((id: string) => (
              <li key={id}>
                <ListItem id={id} />
              </li>
            ))
          }
        </ol>
        <ListItemCreator onCreateItem={onCreateItem} />
      </div>
    </div>
  </HotKeys>
);

List.displayName = 'List';

List.propTypes = {
  itemIds: PropTypes.instanceOf(ImmutableList).isRequired,
  onCreateItem: PropTypes.func.isRequired,
};

export { List };
