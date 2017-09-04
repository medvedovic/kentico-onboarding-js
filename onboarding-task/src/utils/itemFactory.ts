import { ListItemData } from '../models/ListItemData';
import { generateGuid } from './generateGuid';

export interface IItemFactoryWithGenerator {
  (value: string, id?: number): ListItemData;
}

export const itemFactoryBuilder = (idGenerator: () => string): IItemFactoryWithGenerator  =>
  (value: string, id: number = 0): ListItemData => (
    new ListItemData({
      id,
      localId: idGenerator(),
      value,
    })
  );

export const itemFactory = (value: string, id: number = 0): ListItemData =>
  itemFactoryBuilder(generateGuid)(value, id);
