import {
  IServerItemDataModel,
  toServerItemDataViewModel
} from '../../src/models/IServerItemDataModel';
import { ListItemData } from '../../src/models/ListItemData';

describe('toItemDataDto', () => {
  it('Converts ListItemData to itemDto correctly', () => {
    const testItem = new ListItemData({
      id: '00000000-0000-0000-0000-000000000000',
      value: 'Go home'
    });
    const expectedResult: IServerItemDataModel = {
      value: 'Go home',
      id: '00000000-0000-0000-0000-000000000000'
    };

    const result = toServerItemDataViewModel(testItem);

    expect(expectedResult).toEqual(result);
  });
});
