import { IReducer } from '../IReducer';
import { FetchData } from '../../constants/actionTypes';
import { TypedRecord } from '../../models/TypedRecord';


const defaultValues: IAppSettings = {
  showLoader: false,
  apiEndpoint: 'http://localhost:49520/api/v1/Todos',
  fetchHasFailed: false,
};

export interface IAppSettings {
  showLoader: boolean;
  apiEndpoint: string;
  fetchHasFailed: boolean;
}

export class AppSettings extends TypedRecord<IAppSettings>(defaultValues) implements IAppSettings {
  public showLoader: boolean;
  public apiEndpoint: string;
  public fetchHasFailed: boolean;
}


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
