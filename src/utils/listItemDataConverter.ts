import { ListItemData } from '../models/ListItemData';
import { generateGuid } from './generateGuid';

export interface IListItemDataConverterWithGenerator {
  (value: string, id?: string): ListItemData;
}

export const listItemDataConverterBuilder = (idGenerator: () => string): IListItemDataConverterWithGenerator  =>
  (value: string, id: string): ListItemData => (
    new ListItemData({
      id: id || idGenerator(),
      value,
    })
  );

export const listItemDataConverter = listItemDataConverterBuilder(generateGuid);
