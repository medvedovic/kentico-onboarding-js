import { IReducer } from '../IReducer';
import { FetchData } from '../../constants/actionTypes';
import { TypedRecord } from '../../models/TypedRecord';


const defaultValues: IAppSettings = {
  showLoader: false,
  apiEndpoint: 'http://localhost:49520/api/v1/Todos',
};

export interface IAppSettings {
  showLoader: boolean;
  apiEndpoint: string;
}

export class AppSettings extends TypedRecord<IAppSettings>(defaultValues) implements IAppSettings {
  public showLoader: boolean;
  public apiEndpoint: string;
}


export const settings: IReducer<AppSettings> = (state = new AppSettings(), action) => {
  switch (action.type) {
    case FetchData.IS_LOADING: {
      return state.alter({
        showLoader: action.payload.isLoading,
      });
    }

    default:
      return state;
  }
};
