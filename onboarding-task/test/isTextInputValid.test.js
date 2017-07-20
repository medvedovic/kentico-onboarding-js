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
  it('works on a valid string', () => {
    expect(isTextInputValid('Hello world')).toBe(true);
  });
});
