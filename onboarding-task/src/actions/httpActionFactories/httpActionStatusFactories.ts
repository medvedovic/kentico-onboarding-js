import { IServerItemDataModel } from '../../models/IServerItemDataModel';
import { IAction } from '../IAction';
import { ListItemData } from '../../models/ListItemData';
import { POST_ITEM_TO_SERVER } from '../../constants/actionTypes';

export const handleSuccessfulPost = (temporaryId: string, params: IServerItemDataModel) => ({
  type: POST_ITEM_TO_SERVER.SUCCESS,
  payload: {
    temporaryId,
    item: new ListItemData({
      id: params.id,
      value: params.value,
    })
  }
});

export const handleSuccessfulRequest = (type: string) =>
  (params: IServerItemDataModel): IAction => ({
    type,
    payload: {
      item: new ListItemData({
        id: params.id,
        value: params.value,
      })
    }
  });

export const handleErrorRequest = (type: string) =>
  (id: string, params: Error): IAction => ({
    type,
    payload: {
      error: params,
      item: {
        id
      }
    }
  });
