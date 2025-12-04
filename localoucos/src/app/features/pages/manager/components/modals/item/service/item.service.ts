import { inject, Inject, Injectable } from '@angular/core';
import {  ItemPayload, ItemModel } from '../models/item';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private httpClient = inject(HttpClient);

  findActorById(id: string) {
    return this.httpClient.get<ItemModel>('http://localhost:8000/items/' + id);
  }

  listItems() {
    return this.httpClient.get<ItemModel[]>('http://localhost:8000/items/');
  }

  deleteItem(id: string) {
    return this.httpClient.delete('http://localhost:8000/items/' + id);
  }

  updateItem(id: string, payload: ItemPayload) {
    return this.httpClient.put<ItemModel>('http://localhost:8000/items/' + id, payload);
  }

  saveItem(payload: ItemPayload) {
    return this.httpClient.post<ItemModel>('http://localhost:8000/items/', payload);
  }
}
