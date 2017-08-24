import { Store } from './stores';
import { IReducer } from '../interfaces';

/**
 * Holds all reducers used in application
 */
export namespace Reducer {
  export type Root = IReducer<Store.IRoot>;
  export type Items = IReducer<Store.IItems>;
  export type Ids = IReducer<Store.IIds>;
  export type Data = IReducer<Store.IData>;
  export type Flags = IReducer<Store.IFlags>;
}
