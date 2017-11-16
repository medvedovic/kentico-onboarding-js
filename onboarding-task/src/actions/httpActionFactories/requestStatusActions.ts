import { IServerItemDataModel } from '../../models/IServerItemDataModel';
import { IAction } from '../IAction';
import { ListItemData } from '../../models/ListItemData';
import { POST_ITEM_TO_SERVER } from '../../constants/actionTypes';

export const postRequestHasSucceeded = (temporaryId: string, params: IServerItemDataModel) => ({
  type: POST_ITEM_TO_SERVER.SUCCESS,
  payload: {
    temporaryId,
    item: new ListItemData({
      id: params.id,
      value: params.value,
    })
  }
});

export const requestHasSucceeded = (type: string) =>
  (params: IServerItemDataModel): IAction => ({
    type,
    payload: {
      item: new ListItemData({
        id: params.id,
        value: params.value,
      })
    }
  });

export const requestHasFailed = (type: string) =>
  (id: string, params: Error): IAction => ({
    type,
    payload: {
      error: params,
      item: {
        id
      }
    }
  });
