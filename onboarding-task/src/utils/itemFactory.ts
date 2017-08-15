import { ListItemData } from '../models/ListItemData';
import { generateGuid } from './generateGuid';
import { IListItemData } from '../models/ListItemData';

export interface IItemFactoryWithGenerator {
  (value: string): IListItemData;
}

export const itemFactoryBuilder = (idGenerator: () => string): IItemFactoryWithGenerator  =>
  (value: string): IListItemData => (
    new ListItemData({
      id: idGenerator(),
      value,
    })
  );

export const itemFactory = (value: string): IListItemData =>
  itemFactoryBuilder(generateGuid)(value);
