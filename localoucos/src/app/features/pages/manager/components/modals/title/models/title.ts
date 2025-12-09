
import { ActorModel } from "../../actor/models/actor";
import { ClassModel } from "../../class/models/class";
import { DirectorModel } from "../../director/models/director";

export interface TitleModel {
  id: string | null;
  name: string;
  year: number;
  synopsis: string;
  category: string;
  movie_class_id: string;
  actor_ids: string[];
  director_id: string;
}

export type TitlePayload = Omit<TitleModel, 'id'>;
