export interface DependentsModel {
  id: string;
  name: string;
  birth_date: string;
  gender: string;
}

export type DependentsPayload = Omit<DependentsModel, 'id'>
