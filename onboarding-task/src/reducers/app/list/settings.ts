import { IReducer } from '../../IReducer';
import { FetchData } from '../../../constants/actionTypes';
import { AppSettings } from '../../../constants/AppSettings';


export const settings: IReducer<AppSettings> = (state = new AppSettings(), action) => {
  switch (action.type) {
    case FetchData.IS_LOADING: {
      return state.alter({
        showLoader: action.payload.isLoading,
      });
    }

    case FetchData.HAS_SUCCEEDED: {
      return state.alter({
        fetchHasFailed: false,
      });
    }

    case FetchData.HAS_FAILED: {
      return state.alter({
        fetchHasFailed: true,
      });
    }

    default:
      return state;
  }
};
