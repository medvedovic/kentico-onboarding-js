import { IAction } from '../actions/IAction';

/**
 * Represents a generic reducer
 * @param state - state of reducer that is handled and returned
 * @param action - action to be executed
 */
export interface IReducer<T> {
  (state: T | undefined, action: IAction): T;
}
