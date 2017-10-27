import { EHttpActionStatus } from '../../constants/EHttpActionStatus';
import { IServerItemDataViewModel } from '../../models/IServerItemDataViewModel';
import { IAction } from '../IAction';
import { ListItemData } from '../../models/ListItemData';


export const httpActionSuccessFactory = (type: string) =>
  (localId: string, params: IServerItemDataViewModel): IAction => ({
    type,
    status: EHttpActionStatus.success,
    payload: {
      item: new ListItemData({
        id: params.id,
        value: params.value,
        localId
      })
    }
  });

export const httpActionErrorFactory = (type: string) =>
  (localId: string, params: Error): IAction => ({
    type,
    status: EHttpActionStatus.error,
    payload: {
      error: params,
      item: {
        localId
      }
    }
  });
