import { EHttpActionStatus } from '../../constants/EHttpActionStatus';
import { IServerItemDataViewModel } from '../../models/IServerItemDataViewModel';
import { IAction } from '../IAction';
import { ListItemData } from '../../models/ListItemData';


export const httpActionSuccessFactory = (type: string) =>
  (id: string, params: IServerItemDataViewModel): IAction => ({
    type,
    status: EHttpActionStatus.success,
    payload: {
      id,
      item: new ListItemData({
        id: params.id,
        value: params.value,
      })
    }
  });

export const httpActionErrorFactory = (type: string) =>
  (id: string, params: Error): IAction => ({
    type,
    status: EHttpActionStatus.error,
    payload: {
      error: params,
      item: {
        id
      }
    }
  });
