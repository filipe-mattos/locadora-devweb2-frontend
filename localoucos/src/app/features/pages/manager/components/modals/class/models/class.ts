export interface ClassModel {
  id: string | null;
  name: string;
}

export type ClassPayload = Omit<ClassModel, 'id'>;
