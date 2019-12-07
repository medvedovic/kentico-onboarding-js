import { isTextInputValid } from '../../src/utils/isTextInputValid.ts';

describe('isTextInputValid', () => {
  it('returns false for whitespaces', () => {
    const isValid = isTextInputValid('     ');

    expect(isValid).toBeFalsy();
  });

  it('returns false for null', () => {
    const isValid = isTextInputValid(null);

    expect(isValid).toBeFalsy();
  });

  it('returns false for undefined', () => {
    const isValid = isTextInputValid(undefined);

    expect(isValid).toBeFalsy();
  });

  it('returns false for empty strings', () => {
    const isValid = isTextInputValid('');

    expect(isValid).toBeFalsy();
  });

  it('returns true for a valid string', () => {
    const isValid = isTextInputValid('Hello world');

    expect(isValid).toBeTruthy();
  });
});
