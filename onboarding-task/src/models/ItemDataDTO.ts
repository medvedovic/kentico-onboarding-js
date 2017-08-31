export interface IItemDataDTO {
  Value: string;
}

export const toItemDataDTO = (value: string): IItemDataDTO => ({
  Value: value,
});
