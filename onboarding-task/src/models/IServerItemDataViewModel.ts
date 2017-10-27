import { ListItemData } from './ListItemData';

export interface IServerItemDataViewModel {
  id: string;
  value: string;
}

export const toServerItemDataViewModel = ({ id, value }: ListItemData): IServerItemDataViewModel => ({
  id,
  value,
});
