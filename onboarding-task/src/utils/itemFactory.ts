import { ListItemData } from '../models/ListItemData';
import { generateGuid } from './generateGuid';

export interface IItemFactoryWithGenerator {
  (value: string, id?: string): ListItemData;
}

export const itemFactoryBuilder = (idGenerator: () => string): IItemFactoryWithGenerator  =>
  (value: string, id: string = '00000000-0000-0000-0000-000000000000'): ListItemData => (
    new ListItemData({
      id,
      localId: idGenerator(),
      value,
    })
  );

export const itemFactory = (value: string, id: string = '00000000-0000-0000-0000-000000000000'): ListItemData =>
  itemFactoryBuilder(generateGuid)(value, id);
