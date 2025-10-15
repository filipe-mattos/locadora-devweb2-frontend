import { inject, Inject, Injectable } from '@angular/core';
import { ClassModel, ClassPayload } from '../models/class';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  private httpClient = inject(HttpClient);

  findActorById(id: string) {
    return this.httpClient.get<ClassModel>('http://localhost:3000/class/' + id);
  }

  listActors() {
    return this.httpClient.get<ClassModel[]>('http://localhost:3000/class/');
  }

  deleteActor(id: string) {
    return this.httpClient.delete('http://localhost:3000/class/' + id);
  }

  updateActor(id: string, payload: ClassPayload) {
    return this.httpClient.put('http://localhost:3000/class/' + id, payload);
  }

  saveActor(payload: ClassPayload) {
    return this.httpClient.post('http://localhost:3000/class/', payload);
  }
}
