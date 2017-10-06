import { ListItemData } from './ListItemData';

export interface IItemDataDTO {
  id: string;
  value: string;
}

export const toItemDataDTO = ({ id, value }: ListItemData): IItemDataDTO => ({
  id,
  value,
});
