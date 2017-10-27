import { FetchData } from '../../../constants/actionTypes';
import { IReducer } from '../../IReducer';

export const fetchHasFailed: IReducer<boolean> = (state = false, action) => {
  switch (action.type) {
    case FetchData.HAS_SUCCEEDED: {
      return false;
    }

    case FetchData.HAS_FAILED: {
      return true;
    }

    default:
      return state;
  }
};
