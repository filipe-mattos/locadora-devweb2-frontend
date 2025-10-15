import { inject, Inject, Injectable } from '@angular/core';
import { DirectorModel, DirectorPayload } from '../models/director';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DirectorService {
  private httpClient = inject(HttpClient);

  findActorById(id: string) {
    return this.httpClient.get<DirectorModel>('http://localhost:8000/directors/' + id);
  }

  listActors() {
    return this.httpClient.get<DirectorModel[]>('http://localhost:8000/directors/');
  }

  deleteActor(id: string) {
    return this.httpClient.delete('http://localhost:8000/directors/' + id);
  }

  updateActor(id: string, payload: DirectorPayload) {
    return this.httpClient.put<DirectorModel>('http://localhost:8000/directors/' + id, payload);
  }

  saveActor(payload: DirectorPayload) {
    return this.httpClient.post<DirectorModel>('http://localhost:8000/directors/', payload);
  }
}
