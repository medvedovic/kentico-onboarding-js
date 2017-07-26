import { OrderedMap } from 'immutable';
import { ListItemModel } from '../../src/model/ListItemModel';
import { generateGuid } from '../../src/utils/generateGuid'
import { listApp } from '../../src/reducers/reducers';
import {
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
} from '../../src/actions/actionTypes';

describe('List App reducer', () => {
  const _guid1 = generateGuid();
  const _guid2 = generateGuid();
  const initialState = new OrderedMap([
    [_guid1, new ListItemModel({ value: 'Make coffee' })],
    [_guid2, new ListItemModel({ value: 'Master React' })],
  ]);

  it('Adds new item properly', () => {
    expect(
      listApp(
        initialState, {
          type: CREATE_ITEM,
          value: 'Do stuff',
        }
      ).count()
    ).toBe(3);
  });

  it('Updates item properly', () => {
    expect(
      listApp(
        initialState, {
          type: UPDATE_ITEM,
          item: {
            guid: _guid1,
            value: 'Do stuff',
          },
        }
      )
    ).toEqual(
      new OrderedMap([
        [_guid1, new ListItemModel({ value: 'Do stuff' })],
        [_guid2, new ListItemModel({ value: 'Master React' })],
      ])
    );
  });

  it('Deletes item properly', () => {
    expect(
      listApp(
        initialState, {
          type: DELETE_ITEM,
          itemGuid: _guid1,
        }
      )
    ).toEqual(
      new OrderedMap([
        [_guid2, new ListItemModel({ value: 'Master React' })],
      ])
    );
  });
});
