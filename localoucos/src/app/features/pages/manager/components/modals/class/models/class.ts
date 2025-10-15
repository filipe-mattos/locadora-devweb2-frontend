export interface ClassModel {
  id: string | null;
  name: string;
  value: number;
  devolution: number
}

export type ClassPayload = Omit<ClassModel, 'id'>;
