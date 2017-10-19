import { EHttpActionStatus } from '../../constants/actionTypes';
import { IItemDataDTO } from '../../models/ItemDataDTO';
import { IAction } from '../IAction';
import { ListItemData } from '../../models/ListItemData';

interface IFetchActionBuilder {
  (localId: string, params: IItemDataDTO | Error): IAction;
}

export const httpStatusActionBuilder = (type: string, status: EHttpActionStatus): IFetchActionBuilder => {
  return status === EHttpActionStatus.success ?
    (localId: string, params: IItemDataDTO) => ({
      type,
      status,
      payload: {
        item: new ListItemData({
          id: params.id,
          value: params.value,
          localId,
        })
      }
    })
    :
    (localId: string, params: Error) => ({
      type,
      status,
      payload: {
        error: params,
        item: {
          localId
        }
      }
    });
};
