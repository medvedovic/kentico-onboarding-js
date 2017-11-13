import { ListItemFlags } from '../../../../src/models/ListItemFlags.ts';
import { flag } from '../../../../src/reducers/items/flags/flag.ts';
import { toggleBeingEdited } from '../../../../src/actions/publicActions.ts';
import { ListItemData } from '../../../../src/models/ListItemData.ts';
import { POST_ITEM_TO_SERVER } from '../../../../src/constants/actionTypes.ts';
import {
  handleErrorRequest,
  handleSuccessfulRequest,
} from '../../../../src/actions/httpActionFactories/httpActionStatusFactories.ts';
import {
  DELETE_ITEM_TO_SERVER_FAILURE,
  PUT_ITEM_TO_SERVER
} from '../../../../src/constants/actionTypes';

const createItem = (value) =>
  new ListItemData({ id: '982f42cd-106e-4530-b6bc-bcdfe7fecbb9', value });

describe('flagReducer', () => {
  it('toggles being edited properly', () => {
    const expectedState = new ListItemFlags({
      isBeingEdited: true,
    });

    const newState = flag(new ListItemFlags(), toggleBeingEdited(''));

    expect(newState).toEqual(expectedState);
  });

  it('sets flags correctly of action to server failure', () => {
    const actionsToTest = [
      POST_ITEM_TO_SERVER.FAILURE,
      PUT_ITEM_TO_SERVER.FAILURE,
      DELETE_ITEM_TO_SERVER_FAILURE
    ];
    actionsToTest.forEach((actionType) => {
      const expectedResult = new ListItemFlags({
        isBeingEdited: false,
        isSavedSuccess: false,
        failedHttpAction: actionType,
      });
      const action = handleErrorRequest(actionType)('id', new Error());

      const testResult = flag(undefined, action);

      expect(testResult).toEqual(expectedResult);
    });
  });

  it('returns default state', () => {
    const expectedState = new ListItemFlags();

    const test = flag(undefined, {});

    expect(test).toEqual(expectedState);
  });
});
