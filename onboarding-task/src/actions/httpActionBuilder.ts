import { HttpAction } from '../constants/actionTypes';
import { toItemDataDTO } from '../models/ItemDataDTO';

const fetch = require('isomorphic-fetch');

const httpActionBuilder = (url: string, httpMethod: string, body?: any) =>
  fetch(url, {
    method: httpMethod,
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
    .then((response: Response) => {
      if (!response.ok)
        throw new Error(response.statusText + ' at ' + response.url);
      return response;
    });

export const deleteAction = (url: string, id: string) =>
  httpActionBuilder(`${url}/${id}`, HttpAction.DELETE);

export const postAction = (url: string, value: string) => {
  const itemDto = toItemDataDTO(value);

  return httpActionBuilder(url, HttpAction.POST, JSON.stringify(itemDto));
};

export const putAction = (url: string, id: string, value: string) => {
  const itemDto = toItemDataDTO(value, id);

  return httpActionBuilder(`${url}/${id}`, HttpAction.PUT, JSON.stringify(itemDto));
};
