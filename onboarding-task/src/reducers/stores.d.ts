import {
  List,
  Map
} from 'immutable';
import { ListItemData } from '../models/ListItemData';
import { ListItemFlags } from '../models/ListItemFlags';

/**
 * Holds all stores used in application
 */
export namespace Store {
  export interface IRoot {
    items: IItems;
  }

  export interface IItems {
    ids: IIds;
    data: IData;
    flags: IFlags;
  }

  export type IIds = List<string>;
  export type IData = Map<string, ListItemData>;
  export type IFlags = Map<string, ListItemFlags>;
}
