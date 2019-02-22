import { FETCH_DATA } from '../../../constants/actionTypes';
import { IReducer } from '../../IReducer';

export const fetchHasFailed: IReducer<boolean> = (state = false, action) => {
  switch (action.type) {
    case FETCH_DATA.HAS_SUCCEEDED: {
      return false;
    }

    case FETCH_DATA.HAS_FAILED: {
      return true;
    }

    default:
      return state;
  }
};
