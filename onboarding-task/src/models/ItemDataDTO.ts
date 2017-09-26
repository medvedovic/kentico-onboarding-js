export interface IItemDataDTO {
  id: string;
  value: string;
}

export const toItemDataDTO = (value: string, id: string = '00000000-0000-0000-0000-000000000000'): IItemDataDTO => ({
  id,
  value
});
