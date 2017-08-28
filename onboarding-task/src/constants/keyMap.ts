interface IKeyMap {
  readonly saveKey: string;
  readonly cancelKey: string;
  readonly focusNewItemKey: string;
}

export type IKeyMapHandlers = {
  [P in keyof IKeyMap]: () => void;
};

export const keyMap: IKeyMap = {
  saveKey: 'enter',
  cancelKey: 'escape',
  focusNewItemKey: 'option+n',
};
