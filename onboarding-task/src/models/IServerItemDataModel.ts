import { ListItemData } from './ListItemData';

export interface IServerItemDataModel {
  readonly id: string;
  readonly value: string;
  readonly createdAt: Date,
  readonly updatedAt: Date
}

export interface IServerItemUpdateModel {
  readonly id: string;
  readonly value: string;
}

export const toServerItemDataViewModel = ({ id, value }: ListItemData): IServerItemUpdateModel => ({
  id,
  value,
});
