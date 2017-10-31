import { IAction } from '../actions/IAction';

export interface Dispatch {
  (action: IAction): IAction;
  <S>(thunk: (dispatch: Dispatch, getState?: () => S) => IAction): IAction;
  <R, S>(thunk: (dispatch: Dispatch, getState?: () => S) => Promise<R>): Promise<R>;
}


