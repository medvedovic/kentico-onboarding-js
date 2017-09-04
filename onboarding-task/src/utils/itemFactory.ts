import { ListItemData } from '../models/ListItemData';
import { generateGuid } from './generateGuid';

export interface IItemFactoryWithGenerator {
  (value: string): ListItemData;
}

export const itemFactoryBuilder = (idGenerator: () => string): IItemFactoryWithGenerator  =>
  (value: string): ListItemData => (
    new ListItemData({
      localId: idGenerator(),
      value,
    })
  );

export const itemFactory = (value: string): ListItemData =>
  itemFactoryBuilder(generateGuid)(value);
