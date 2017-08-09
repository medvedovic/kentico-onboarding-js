import { ListItemData } from '../models/ListItemData';
import { generateGuid } from './generateGuid';

export const itemFactoryBuilder = (idGenerator) =>
  (value) => (
    new ListItemData({
      id: idGenerator(),
      value,
    })
  );

export const itemFactory = (value) =>
  itemFactoryBuilder(generateGuid)(value);
