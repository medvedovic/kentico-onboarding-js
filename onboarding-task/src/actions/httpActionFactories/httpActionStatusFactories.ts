import { HttpActionStatus } from '../../constants/HttpActionStatus';
import { IServerItemDataModel } from '../../models/IServerItemDataModel';
import { IAction } from '../IAction';
import { ListItemData } from '../../models/ListItemData';


export const httpActionSuccessFactory = (type: string) =>
  (id: string, params: IServerItemDataModel): IAction => ({
    type,
    payload: {
      id,
      item: new ListItemData({
        id: params.id,
        value: params.value,
      }),
      status: HttpActionStatus.success
    }
  });

export const httpActionErrorFactory = (type: string) =>
  (id: string, params: Error): IAction => ({
    type,
    payload: {
      error: params,
      item: {
        id
      },
      status: HttpActionStatus.error,
    }
  });
