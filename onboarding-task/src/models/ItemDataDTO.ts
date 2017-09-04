export interface IItemDataDTO {
  id: number;
  value: string;
}

export const toItemDataDTO = (value: string, id: number = 0): IItemDataDTO => ({
  id,
  value
});
