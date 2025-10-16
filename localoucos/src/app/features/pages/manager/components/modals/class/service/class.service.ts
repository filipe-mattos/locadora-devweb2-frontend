import { inject, Inject, Injectable } from '@angular/core';
import { ClassModel, ClassPayload } from '../models/class';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  private httpClient = inject(HttpClient);

  findActorById(id: string) {
    return this.httpClient.get<ClassModel>('http://localhost:8000/movie-classes/' + id);
  }

  listActors() {
    return this.httpClient.get<ClassModel[]>('http://localhost:8000/movie-classes/');
  }

  deleteActor(id: string) {
    return this.httpClient.delete('http://localhost:8000/movie-classes/' + id);
  }

  updateActor(id: string, payload: ClassPayload) {
    return this.httpClient.put('http://localhost:8000/movie-classes/' + id, payload);
  }

  saveActor(payload: ClassPayload) {
    return this.httpClient.post('http://localhost:8000/movie-classes/', payload);
  }
}
