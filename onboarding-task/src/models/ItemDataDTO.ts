export interface IItemDataDTO {
  Id?: number;
  Value: string;
}

export const toItemDataDTO = (value: string): IItemDataDTO => ({
  Value: value,
});
