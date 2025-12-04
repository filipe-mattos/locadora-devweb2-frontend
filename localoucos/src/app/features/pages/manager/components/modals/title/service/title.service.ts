import { inject, Inject, Injectable } from '@angular/core';
import { TitleModel, TitlePayload } from '../models/title';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private httpClient = inject(HttpClient);

  findActorById(id: string) {
    return this.httpClient.get<TitleModel>('http://localhost:8000/titles/' + id);
  }

  listActors() {
    return this.httpClient.get<TitleModel[]>('http://localhost:8000/titles/');
  }

  deleteActor(id: string) {
    return this.httpClient.delete('http://localhost:8000/titles/' + id);
  }

  updateActor(id: string, payload: TitlePayload) {
    return this.httpClient.put<TitleModel>('http://localhost:8000/titles/' + id, payload);
  }

  saveActor(payload: TitlePayload) {
    return this.httpClient.post<TitleModel>('http://localhost:8000/titles/', payload);
  }
}
