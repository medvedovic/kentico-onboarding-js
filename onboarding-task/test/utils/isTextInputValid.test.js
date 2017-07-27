import { isTextInputValid } from '../../src/utils/isTextInputValid';

describe('isTextInputValid', () => {
  it('returns false for whitespaces', () => {
    const result = isTextInputValid('     ');

    expect(result).toBe(false);
  });

  it('returns false for null', () => {
    const result = isTextInputValid(null);

    expect(result).toBe(false);
  });

  it('returns false for undefined', () => {
    const result = isTextInputValid(undefined);

    expect(result).toBe(false);
  });

  it('returns false for empty strings', () => {
    const result = isTextInputValid('');

    expect(result).toBe(false);
  });

  it('returns true for a valid string', () => {
    const result = isTextInputValid('Hello world');

    expect(result).toBe(true);
  });
});
