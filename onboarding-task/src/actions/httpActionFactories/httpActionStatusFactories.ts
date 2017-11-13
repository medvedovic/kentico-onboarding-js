import { IServerItemDataModel } from '../../models/IServerItemDataModel';
import { IAction } from '../IAction';
import { ListItemData } from '../../models/ListItemData';


export const handleSuccessfulRequest = (type: string) =>
  (id: string, params: IServerItemDataModel): IAction => ({
    type,
    payload: {
      id,
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
