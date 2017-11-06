import 'isomorphic-fetch';
import {
  FetchData,
  ItemActions,
  LocalItemActions,
} from '../constants/actionTypes';
import {
  IListItemDataConverterWithGenerator,
  listItemDataConverter
} from '../utils/listItemDataConverter';
import { IAction } from './IAction';
import { postItemDataActionFactory } from './httpActionFactories/postDataActionFactory';
import { fetchDataActionFactory } from './httpActionFactories/fetchDataActionFactory';
import { putDataActionFactory } from './httpActionFactories/putDataActionFactory';
import {
  deleteItem,
  updateItem
} from './userActions';
import { apiEndpoint } from '../constants/apiEndpoint';
import { fetchBuilder } from './httpActionFactories/fetchBuilder';
import {
  IServerItemDataViewModel,
  toServerItemDataViewModel
} from '../models/IServerItemDataViewModel';
import { redoRequestToServerFactory } from './httpActionFactories/itemDataActionFactory';
import {
  httpActionErrorFactory,
  httpActionSuccessFactory
} from './httpActionFactories/httpActionStatusFactories';
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
  (items: Array<IServerItemDataViewModel>) => ({
    type: FetchData.HAS_SUCCEEDED,
    payload: {
      items: items.map(item => factory(item.value, item.id))
    }
  });


export const fetchHasSucceeded = fetchHasSucceededBuilder(listItemDataConverter);


export const createItemBuilder = (factory: IListItemDataConverterWithGenerator): (value: string) => IAction =>
  (value: string): IAction => ({
    type: LocalItemActions.CREATE_ITEM,
    payload: {
      item: factory(value),
    },
  });

export const createItem = createItemBuilder(listItemDataConverter);


const getItemsFromServer = (url: string) =>
  fetchBuilder(fetch)(url, HttpAction.GET);

const removeItemOnServer = (url: string) =>
  fetchBuilder(fetch)(url, HttpAction.DELETE);

const createItemOnServer = (url: string, itemDto: IServerItemDataViewModel) =>
  fetchBuilder<IServerItemDataViewModel>(fetch)(url, HttpAction.POST, itemDto);

const updateItemOnServer = (url: string, itemDto: IServerItemDataViewModel) =>
  fetchBuilder<IServerItemDataViewModel>(fetch)(url, HttpAction.PUT, itemDto);


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

export const putData = putDataActionFactory({
  operation: updateItemOnServer,
  onSuccess: httpActionSuccessFactory(ItemActions.PUT_ITEM_TO_SERVER),
  onError: httpActionErrorFactory(ItemActions.PUT_ITEM_TO_SERVER),
  updateItemOperation: updateItem,
  apiEndpoint
});


export const redoPostData = redoRequestToServerFactory({
  operation: createItemOnServer,
  transformDataToDto: toServerItemDataViewModel,
  onSuccess: httpActionSuccessFactory(ItemActions.POST_ITEM_TO_SERVER),
  onError: httpActionErrorFactory(ItemActions.POST_ITEM_TO_SERVER),
  apiEndpoint
});

export const redoPutData = redoRequestToServerFactory({
  operation: updateItemOnServer,
  transformDataToDto: toServerItemDataViewModel,
  onSuccess: httpActionSuccessFactory(ItemActions.PUT_ITEM_TO_SERVER),
  onError: httpActionErrorFactory(ItemActions.PUT_ITEM_TO_SERVER),
  apiEndpoint
});

export const deleteData = redoRequestToServerFactory({
  operation: removeItemOnServer,
  onError: httpActionErrorFactory(ItemActions.DELETE_ITEM_TO_SERVER),
  onSuccess: deleteItem,
  apiEndpoint
});
