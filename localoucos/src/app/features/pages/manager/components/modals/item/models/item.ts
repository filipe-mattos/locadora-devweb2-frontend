export interface ItemModel {
  id: string | null;
  numSerie: number;
  aquisicaoDate: Date;
  itemType: number;
}

export type ItemPayload = Omit<ItemModel, 'id'>;
