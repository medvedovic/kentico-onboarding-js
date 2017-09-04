export interface IItemDataDTO {
  id?: number;
  value: string;
}

export const toItemDataDTO = (value: string): IItemDataDTO => ({
  value: value,
});
