import { listItemDataConverterBuilder } from '../../src/utils/listItemDataConverter.ts';
import { ListItemData } from '../../src/models/ListItemData.ts';

describe('Item factory', () => {
  it('returns new ListItemData correctly', () => {
    const dummyIdGenerator = () =>
      '9451e1f0-0279-4910-905f-05099d566ec6';

    const expectedResult = new ListItemData({
      id: '9451e1f0-0279-4910-905f-05099d566ec6',
      value: 'Make a sandwich',
    });

    const newItem = listItemDataConverterBuilder(dummyIdGenerator)('Make a sandwich');

    expect(newItem).toEqual(expectedResult);
  });
});
