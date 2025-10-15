export interface ClassModel {
  id: string | null;
  name: string;
  value: number;
  return_date: number;
}

export type ClassPayload = Omit<ClassModel, 'id'>;
