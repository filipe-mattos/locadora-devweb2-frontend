import { inject, Inject, Injectable } from '@angular/core';
import { ActorModel, ActorPayload } from '../models/actor';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ActorService {
  private httpClient = inject(HttpClient);

  findActorById(id: string) {
    return this.httpClient.get('http://localhost:8000/actors/' + id);
  }

  listActors() {
    return this.httpClient.get<ActorModel[]>('http://localhost:8000/actors/');
  }

  deleteActor(id: string) {
    return this.httpClient.delete('http://localhost:8000/actors/' + id);
  }

  updateActor(id: string, payload: ActorPayload) {
    return this.httpClient.put('http://localhost:8000/actors/' + id, payload);
  }

  saveActor(payload: ActorPayload) {
    return this.httpClient.post('http://localhost:8000/actors/', payload);
  }
}
