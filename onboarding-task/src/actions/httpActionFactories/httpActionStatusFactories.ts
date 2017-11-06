import { HttpActionStatus } from '../../constants/HttpActionStatus';
import { IServerItemDataViewModel } from '../../models/IServerItemDataViewModel';
import { IAction } from '../IAction';
import { ListItemData } from '../../models/ListItemData';


export const httpActionSuccessFactory = (type: string) =>
  (id: string, params: IServerItemDataViewModel): IAction => ({
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
