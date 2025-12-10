export interface ItemModel {
  id: string;
  serial_number: string;
  acquisition_date: string;
  type: string;
  title_id: string;
}

export type ItemPayload = Omit<ItemModel, 'id'>;
