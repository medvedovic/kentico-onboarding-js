import {
  CREATE_ITEM,
  FetchData
} from '../constants/actionTypes';
import { IItemFactoryWithGenerator } from '../utils/itemFactory';

import { IAction } from './IAction';
import { Dispatch } from 'react-redux';
import {
  toItemDataDTO
} from '../models/ItemDataDTO';
import { createItem } from './publicActions';

export const createItemBuilder = (factory: IItemFactoryWithGenerator): (value: string) => IAction =>
  (value: string): IAction => ({
    type: CREATE_ITEM,
    payload: {
      item: factory(value),
    },
  });

export const fetchHasFailed = (errorMessage: string) => {
  return {
    type: FetchData.HAS_FAILED,
    payload: {
      errorMessage,
    }
  };
};

export const fetchIsLoading = (bool: boolean) => {
  return {
    type: FetchData.IS_LOADING,
    payload: {
      isLoading: bool
    }
  };
};

export const fetchHasSucceeded = (items: any) => {
  return {
    type: FetchData.HAS_SUCCEEDED,
    payload: {
      items
    }
  };
};


export const fetchData = (url: string) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(fetchIsLoading(true));

    setTimeout(() => {
      fetch(url)
        .then(response => response.json())
        .then(response => {
          dispatch(fetchHasSucceeded(response));
          dispatch(fetchIsLoading(false));
        })
        .catch(response => dispatch(fetchHasFailed(response.message)));
    },         3000);
  };
};

export const postData = (url: string, value: string) => {
  return (dispatch: Dispatch<any>) => {
    const itemDto = toItemDataDTO(value);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemDto)
    }).then(response => response.json())
      .then(() => dispatch(createItem(value)));
  };
};
