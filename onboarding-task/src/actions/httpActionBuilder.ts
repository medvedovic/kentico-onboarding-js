import { HttpAction } from '../constants/actionTypes';
import { toItemDataDTO } from '../models/ItemDataDTO';

const fetch = require('isomorphic-fetch');

export const httpActionBuilder = (injectedFetch: (url: string, init?: any) => Promise<Response>) =>
  (url: string, httpMethod: string, body?: any) => {
    const requestParameters = {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json'
      },
      body
    };

    return injectedFetch(url, requestParameters)
      .then((response: Response) => {
        if (!response.ok)
          throw new Error(response.statusText + ' at ' + response.url);

        return response;
    });
  };

export const deleteAction = (url: string, id: string) =>
  httpActionBuilder(fetch)(`${url}/${id}`, HttpAction.DELETE);

export const postAction = (url: string, value: string) => {
  const itemDto = toItemDataDTO(value);

  return httpActionBuilder(fetch)(url, HttpAction.POST, JSON.stringify(itemDto));
};

export const putAction = (url: string, id: string, value: string) => {
  const itemDto = toItemDataDTO(value, id);

  return httpActionBuilder(fetch)(`${url}/${id}`, HttpAction.PUT, JSON.stringify(itemDto));
};
