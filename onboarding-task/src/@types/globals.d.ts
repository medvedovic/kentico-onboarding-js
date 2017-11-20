import { IAction } from '../actions/IAction';

declare global {
  interface Dispatch {
    (action: IAction): IAction;
    <State>(thunk: (dispatch: Dispatch, getState?: () => State) => IAction): IAction;
    <ResponseType, State>(thunk: (dispatch: Dispatch, getState?: () => State) => Promise<ResponseType>): Promise<ResponseType>;
  }
}
