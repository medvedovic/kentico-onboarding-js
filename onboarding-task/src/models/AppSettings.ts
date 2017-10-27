import { TypedRecord } from './TypedRecord';

const defaultValues: IAppSettings = {
  showLoader: false,
  fetchHasFailed: false,
};

export interface IAppSettings {
  showLoader: boolean;
  fetchHasFailed: boolean;
}

export class AppSettings extends TypedRecord<IAppSettings>(defaultValues) implements IAppSettings {
  public showLoader: boolean;
  public fetchHasFailed: boolean;
}
