import { FetchData } from '../constants/actionTypes';
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
