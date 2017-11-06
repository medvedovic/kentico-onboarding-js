import { ListItemData } from './ListItemData';

export interface IServerItemDataModel {
  id: string;
  value: string;
}

export const toServerItemDataViewModel = ({ id, value }: ListItemData): IServerItemDataModel => ({
  id,
  value,
});
