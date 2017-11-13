import { FETCH_DATA } from '../../../constants/actionTypes';
import { IReducer } from '../../IReducer';

export const isLoading: IReducer<boolean> = (state = true, action) => {
  switch (action.type) {
    case FETCH_DATA.IS_LOADING: {
      return true;
    }

    case FETCH_DATA.HAS_SUCCEEDED:
    case FETCH_DATA.HAS_FAILED: {
      return false;
    }

    default:
      return state;
  }
};
