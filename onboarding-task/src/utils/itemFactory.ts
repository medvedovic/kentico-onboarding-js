import { ListItemData } from '../models/ListItemData';
import { generateGuid } from './generateGuid';
import { IListItemData } from '../interfaces';

<<<<<<< HEAD
export interface IItemFactoryWithGenerator {
  (value: string): IListItemData;
}
=======
export type itemFactoryWithGenerator = {
  (value: string): IListItemData
};
>>>>>>> 84d2c62d55e2b5634b12552d1b40f89d35c25335

export const itemFactoryBuilder = (idGenerator: () => string): IItemFactoryWithGenerator  =>
  (value: string): IListItemData => (
    new ListItemData({
      id: idGenerator(),
      value,
    })
  );

export const itemFactory = (value: string): IListItemData =>
  itemFactoryBuilder(generateGuid)(value);
