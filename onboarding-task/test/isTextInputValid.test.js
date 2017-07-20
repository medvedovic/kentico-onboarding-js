import { isTextInputValid } from '../src/utils/isTextInputValid';

describe('isTextInputValid', () => {
  it('works on null', () => {
    expect(isTextInputValid(null)).toBe(false);
  });
  it('works on undefined', () => {
    expect(isTextInputValid(undefined)).toBe(false);
  });
  it('works on empty strings', () => {
    expect(isTextInputValid('')).toBe(false);
  });
  it('works on any string', () => {
    expect(isTextInputValid(Math.random().toString(36) + '00000000000000000').slice(2, 12)).toBe(true);
  });
});
