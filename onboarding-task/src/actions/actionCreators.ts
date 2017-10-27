import 'isomorphic-fetch';
import {
  FetchData,
  ItemActions,
  LocalItemActions,
} from '../constants/actionTypes';
import {
  IItemFactoryWithGenerator,
  itemFactory
} from '../utils/itemFactory';
import { IAction } from './IAction';
import {
  postItemDataActionFactory,
  postItemDataCore,
} from './httpActionFactories/postDataActionFactory';
import { fetchDataActionFactory } from './httpActionFactories/fetchDataActionFactory';
import {
  putDataActionFactory,
  putDataActionFactoryCore
} from './httpActionFactories/putDataActionFactory';
import { deleteDataActionFactoryCore } from './httpActionFactories/deleteDataActionFactory';
import {
  deleteItem,
  updateItem
} from './userActions';
import { apiEndpoint } from '../constants/AppSettings';
import { fetchBuilder } from './httpActionFactories/fetchBuilder';
import {
  IItemDataDTO,
  toItemDataDTO
} from '../models/ItemDataDTO';
import { itemDataActionFactory } from './httpActionFactories/itemDataActionFactory';
import {
  httpActionErrorFactory,
  httpActionSuccessFactory
} from './httpActionFactories/httpStatusActionBuilder';
import { ListItemData } from '../models/ListItemData';
import { HttpAction } from '../constants/HttpAction';


export const fetchIsLoading = () => ({
  type: FetchData.IS_LOADING,
  payload: undefined
});

export const fetchHasFailed = (error: Error) => ({
  type: FetchData.HAS_FAILED,
  payload: {
    error,
  }
});

export const fetchHasSucceededBuilder = (factory: (value: string, id: string) => ListItemData) =>
  (items: Array<IItemDataDTO>) => ({
    type: FetchData.HAS_SUCCEEDED,
    payload: {
      items: items.map(item => factory(item.value, item.id))
    }
  });


export const fetchHasSucceeded = fetchHasSucceededBuilder(itemFactory);


export const createItemBuilder = (factory: IItemFactoryWithGenerator): (value: string) => IAction =>
  (value: string): IAction => ({
    type: LocalItemActions.CREATE_ITEM,
    payload: {
      item: factory(value),
    },
  });

export const createItem = createItemBuilder(itemFactory);


const getItemsFromServer = (url: string) =>
  fetchBuilder(fetch)(url, HttpAction.GET);

const removeItemOnServer = (url: string) =>
  fetchBuilder(fetch)(url, HttpAction.DELETE);

const createItemOnServer = (url: string, itemDto: IItemDataDTO) =>
  fetchBuilder<IItemDataDTO>(fetch)(url, HttpAction.POST, itemDto);

const updateItemOnServer = (url: string, itemDto: IItemDataDTO) =>
  fetchBuilder<IItemDataDTO>(fetch)(url, HttpAction.PUT, itemDto);


export const fetchData = fetchDataActionFactory({
  fetchOperation: getItemsFromServer,
  startLoader: fetchIsLoading,
  onFetchSucceeded: fetchHasSucceeded,
  onFetchFailed: fetchHasFailed,
  apiEndpoint
});


export const postData = postItemDataActionFactory({
  operation: createItemOnServer,
  onSuccess: httpActionSuccessFactory(ItemActions.POST_ITEM_TO_SERVER),
  onError: httpActionErrorFactory(ItemActions.POST_ITEM_TO_SERVER),
  createItemOperation: createItem,
  apiEndpoint
});

export const repostData = itemDataActionFactory(postItemDataCore, {
  operation: createItemOnServer,
  transformDataToDto: toItemDataDTO,
  onSuccess: httpActionSuccessFactory(ItemActions.POST_ITEM_TO_SERVER),
  onError: httpActionErrorFactory(ItemActions.POST_ITEM_TO_SERVER),
  apiEndpoint
});


export const putData = putDataActionFactory({
  operation: updateItemOnServer,
  onSuccess: httpActionSuccessFactory(ItemActions.PUT_ITEM_TO_SERVER),
  onError: httpActionErrorFactory(ItemActions.PUT_ITEM_TO_SERVER),
  updateItemOperation: updateItem,
  apiEndpoint
});

export const reputData = itemDataActionFactory(putDataActionFactoryCore, {
  operation: updateItemOnServer,
  transformDataToDto: toItemDataDTO,
  onSuccess: httpActionSuccessFactory(ItemActions.PUT_ITEM_TO_SERVER),
  onError: httpActionErrorFactory(ItemActions.PUT_ITEM_TO_SERVER),
  apiEndpoint
});


export const deleteData = itemDataActionFactory(deleteDataActionFactoryCore, {
  operation: removeItemOnServer,
  onError: httpActionErrorFactory(ItemActions.DELETE_ITEM_TO_SERVER),
  onSuccess: deleteItem,
  apiEndpoint
});
