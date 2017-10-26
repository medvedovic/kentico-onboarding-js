import { ListItemFlags } from '../../../../src/models/ListItemFlags.ts';
import { flag } from '../../../../src/reducers/items/flags/flag.ts';
import { toggleBeingEdited } from '../../../../src/actions/publicActions.ts';
import { ListItemData } from '../../../../src/models/ListItemData.ts';
import { httpStatusActionBuilder } from '../../../../src/actions/httpActionFactories/httpStatusActionBuilder.ts';
import {
  ItemActions,
} from '../../../../src/constants/actionTypes.ts';
import { EHttpActionStatus } from '../../../../src/constants/EHttpActionStatus';

const createItem = (value) =>
  new ListItemData({ id: '982f42cd-106e-4530-b6bc-bcdfe7fecbb9', value });

describe('Flag Reducer', () => {
  it('returns new flags on create item', () => {
    const test = flag(undefined, createItem('Make a sandwich'));

    expect(test).toEqual(new ListItemFlags());
  });

  it('toggles being edited properly', () => {
    const expectedState = new ListItemFlags({
      isBeingEdited: true,
    });

    const newState = flag(new ListItemFlags(), toggleBeingEdited(''));

    expect(newState).toEqual(expectedState);
  });

  it('returns default state on wrong input', () => {
    const expectedState = new ListItemFlags();

    const test = flag(undefined, createItem(''));

    expect(test).toEqual(expectedState);
  });

  it('sets flags correctly of action to server failure', () => {
    const expectedResult = new ListItemFlags({
      isBeingEdited: false,
      isSavedSuccess: false,
      failedHttpAction: ItemActions.POST_ITEM_TO_SERVER,
    });
    const action = httpStatusActionBuilder(ItemActions.POST_ITEM_TO_SERVER, EHttpActionStatus.error)('id', new Error());

    const testResult = flag(undefined, action);

    expect(testResult).toEqual(expectedResult);
  });

  it('sets flags correctly of action to server success', () => {
    const expectedResult = new ListItemFlags({
      isBeingEdited: false,
      isSavedSuccess: true,
      failedHttpAction: undefined,
    });
    const action = httpStatusActionBuilder(ItemActions.POST_ITEM_TO_SERVER, EHttpActionStatus.success)('id', new Error());

    const testResult = flag(undefined, action);

    expect(testResult).toEqual(expectedResult);
  });
});
