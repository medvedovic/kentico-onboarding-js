import { IAction } from '../actions/IAction';

declare global {
  interface Dispatch {
    (action: IAction): IAction;
    <S>(thunk: (dispatch: Dispatch, getState?: () => S) => IAction): IAction;
    <R, S>(thunk: (dispatch: Dispatch, getState?: () => S) => Promise<R>): Promise<R>;
  }
}
