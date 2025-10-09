export interface ActorModel {
  id: string | null;
  name: string;
}

export type ActorPayload = Omit<ActorModel, 'id'>;
