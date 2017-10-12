import { Map } from 'immutable';
import { flags } from '../../../../src/reducers/items/flags/flags.ts';
import {
  deleteItem,
  toggleBeingEdited,
} from '../../../../src/actions/publicActions.ts';
import {
  createItemBuilder,
  fetchHasSucceededBuilder,
} from '../../../../src/actions/actionCreators.ts';
import { ListItemFlags } from '../../../../src/models/ListItemFlags.ts';
import { ListItemData } from '../../../../src/models/ListItemData.ts';

describe('Flags reducer', () => {
  const id1 = 'e9082417-eae0-4b00-a2d0-5722ba3b1641';
  const id2 = '946ca2ad-a77f-4f8b-8b58-7e40de6f7ba5';
  const initialState = new Map([
    [id1, new ListItemFlags()],
    [id2, new ListItemFlags()],
  ]);

  it('returns new state on create properly', () => {
    const expectedResult = new Map([
      [id1, new ListItemFlags()],
      [id2, new ListItemFlags()],
      ['xxyyzz', new ListItemFlags()],
    ]);
    const dummyFactory = () => new ListItemData({ localId: 'xxyyzz' });
    const dummyCreateItem = createItemBuilder(dummyFactory);

    const result = flags(initialState, dummyCreateItem(''));

    expect(result).toEqual(expectedResult);
  });

  it('toggles flags correctly', () => {
    const expectedResult = new Map([
      [id1, new ListItemFlags()],
      [id2, new ListItemFlags({
        isBeingEdited: true,
      })],
    ]);

    const result = flags(initialState, toggleBeingEdited(id2));

    expect(result).toEqual(expectedResult);
    expect(result).not.toBe(expectedResult);
  });

  it('returns new state on delete correctly', () => {
    const expectedResult = new Map([
      [id1, new ListItemFlags()],
    ]);
    const result = flags(initialState, deleteItem(id2));

    expect(result).toEqual(expectedResult);
  });

  it('returns default state on wrong input', () => {
    const test = flags(undefined, {});

    expect(test).toEqual(new Map());
  });

  it('creates new flags for items after fetch correctly', () => {
    const mockResponse = [
      { id: id1, value: 'Make coffee' },
      { id: id2, value: 'Master React' },
    ];
    const expectedStoreState = new Map([
      [id1, new ListItemFlags()],
      [id2, new ListItemFlags()],
    ]);

    const mockParse = (value, id) => new ListItemData({ id, value, localId: id });
    const fetch = fetchHasSucceededBuilder(mockParse)(mockResponse);

    const testResult = flags(undefined, fetch);

    expect(testResult).toEqual(expectedStoreState);
  });
});
