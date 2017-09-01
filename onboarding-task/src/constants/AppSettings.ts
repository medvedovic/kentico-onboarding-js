import { TypedRecord } from '../models/TypedRecord';

const defaultValues: IAppSettings = {
  showLoader: false,
  apiEndpoint: 'api/v1/Todos',
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
