import { isTextInputValid } from '../../src/utils/isTextInputValid';

describe('isTextInputValid', () => {
  it('returns false for whitespaces', () => {
    expect(isTextInputValid('    ')).toBe(false);
  });
  it('returns false for null', () => {
    expect(isTextInputValid(null)).toBe(false);
  });
  it('returns false for undefined', () => {
    expect(isTextInputValid(undefined)).toBe(false);
  });
  it('returns false for empty strings', () => {
    expect(isTextInputValid('')).toBe(false);
  });
  it('returns true for a valid string', () => {
    expect(isTextInputValid('Hello world')).toBe(true);
  });
});
