import { IReducer } from '../../IReducer';
import { FetchData } from '../../../constants/actionTypes';
import { AppSettings } from '../../../constants/AppSettings';


export const settings: IReducer<AppSettings> = (state = new AppSettings(), action) => {
  switch (action.type) {
    case FetchData.IS_LOADING: {
      return state.alter({
        showLoader: true,
      });
    }

    case FetchData.HAS_SUCCEEDED: {
      return state.alter({
        showLoader: false,
        fetchHasFailed: false,
      });
    }

    case FetchData.HAS_FAILED: {
      return state.alter({
        showLoader: false,
        fetchHasFailed: true,
      });
    }

    default:
      return state;
  }
};
