import { ListItemData } from '../models/ListItemData';
import { generateGuid } from './generateGuid';
import { IListItemData } from '../interfaces';

type itemFactoryWithGenerator = {
  (value: string): IListItemData
};

export const itemFactoryBuilder = (idGenerator: () => string): itemFactoryWithGenerator  =>
  (value: string): IListItemData => (
    new ListItemData({
      id: idGenerator(),
      value,
    })
  );

export const itemFactory = (value: string): IListItemData =>
  itemFactoryBuilder(generateGuid)(value);
