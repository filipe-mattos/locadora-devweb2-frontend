export interface DirectorModel {
  id: string | null;
  name: string;
}

export type DirectorPayload = Omit<DirectorModel, 'id'>;
