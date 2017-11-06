import { FetchData } from '../../../constants/actionTypes';
import { IReducer } from '../../IReducer';

export const isLoading: IReducer<boolean> = (state = true, action) => {
  switch (action.type) {
    case FetchData.IS_LOADING: {
      return true;
    }

    case FetchData.HAS_SUCCEEDED:
    case FetchData.HAS_FAILED: {
      return false;
    }

    default:
      return state;
  }
};
