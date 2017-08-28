export const isTextInputValid = (input: string): boolean =>
  !!input && input.trim().length > 0;
