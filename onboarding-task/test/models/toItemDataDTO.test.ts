import {
  IItemDataDTO,
  toItemDataDTO
} from '../../src/models/ItemDataDTO';

describe('toItemDataDto', () => {
  it('Converts value to itemDto correctly', () => {
    const expectedResult: IItemDataDTO = {
      value: 'Go home',
      id: 50
    };
    const result = toItemDataDTO('Go home', 50);

    expect(expectedResult).toEqual(result);
  });

  it('Sets default id', () => {
    const expectedResult: IItemDataDTO = {
      value: 'Go home',
      id: 0
    };

    const result = toItemDataDTO('Go home');

    expect(result).toEqual(expectedResult);
  });
});
