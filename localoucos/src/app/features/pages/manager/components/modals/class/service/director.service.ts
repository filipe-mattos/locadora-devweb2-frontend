import { inject, Inject, Injectable } from '@angular/core';
import { ClassPayload } from '../models/class';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ActorService {
  private httpClient = inject(HttpClient);

  findActorById(id: string) {
    return this.httpClient.get('http://localhost:3000/actor/' + id);
  }

  listActors() {
    return this.httpClient.get('http://localhost:3000/actors');
  }

  deleteActor(id: string) {
    return this.httpClient.delete('http://localhost:3000/actor/' + id);
  }

  updateActor(id: string, payload: ClassPayload) {
    return this.httpClient.put('http://localhost:3000/actor/' + id, payload);
  }

  saveActor(payload: ClassPayload) {
    return this.httpClient.post('http://localhost:3000/actor', payload);
  }
}
