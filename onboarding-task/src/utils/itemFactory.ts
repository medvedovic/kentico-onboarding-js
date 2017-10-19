import { ListItemData } from '../models/ListItemData';
import { generateGuid } from './generateGuid';

export interface IItemFactoryWithGenerator {
  (value: string, id?: string): ListItemData;
}

export const itemFactoryBuilder = (idGenerator: () => string): IItemFactoryWithGenerator  =>
  (value: string, id: string): ListItemData => (
    new ListItemData({
      id,
      localId: idGenerator(),
      value,
    })
  );

export const itemFactory = (value: string, id: string): ListItemData =>
  itemFactoryBuilder(generateGuid)(value, id);
