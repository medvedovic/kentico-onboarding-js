import {
  List,
  Map
} from 'immutable';
import { ListItemData } from '../models/ListItemData';
import { ListItemFlags } from '../models/ListItemFlags';
import { IAppSettings } from '../models/AppSettings';

/**
 * Holds all stores used in application
 */
export namespace Store {
  export interface IRoot {
    items: IItems;
    app: IApp;
  }

  export interface IItems {
    ids: IIds;
    data: IData;
    flags: IFlags;
  }

  export interface IApp {
    list: IAppSettings;
  }

  export type IIds = List<string>;
  export type IData = Map<string, ListItemData>;
  export type IFlags = Map<string, ListItemFlags>;
}
