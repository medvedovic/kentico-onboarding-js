import {
  IItemDataDTO,
  toItemDataDTO
} from '../../src/models/ItemDataDTO';

describe('toItemDataDto', () => {
  it('Converts value to itemDto correctly', () => {
    const expectedResult: IItemDataDTO = {
      value: 'Go home',
      id: '00000000-0000-0000-0000-000000000000'
    };
    const result = toItemDataDTO('Go home', '00000000-0000-0000-0000-000000000000');

    expect(expectedResult).toEqual(result);
  });

  it('Sets default id', () => {
    const expectedResult: IItemDataDTO = {
      value: 'Go home',
      id: '00000000-0000-0000-0000-000000000000'
    };

    const result = toItemDataDTO('Go home');

    expect(result).toEqual(expectedResult);
  });
});
