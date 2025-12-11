import { inject, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import CustomerModel, { CustomerPayload } from '../models/customer-model';
import { DependentsModel, DependentsPayload } from '../modals/dependents/models/dependents-model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private httpClient = inject(HttpClient);

  findCustomerById(id: string) {
    return this.httpClient.get<CustomerModel>('http://localhost:8000/clients/' + id);
  }

  listCustomer() {
    return this.httpClient.get<CustomerModel[]>('http://localhost:8000/clients/');
  }

  deleteCustomer(id: string) {
    return this.httpClient.delete('http://localhost:8000/clients/' + id);
  }

  updateCustomer(id: string, payload: CustomerPayload) {
    return this.httpClient.put<CustomerModel>('http://localhost:8000/clients/' + id, payload);
  }

  saveCustomer(payload: CustomerPayload) {
    return this.httpClient.post<CustomerModel>('http://localhost:8000/clients/members', payload);
  }

  listDependents(id: string) {
    return this.httpClient.get<DependentsModel[]>('http://localhost:8000/clients/members/' + id + '/dependents');
  }

  deleteDependents(id: string) {
    return this.httpClient.delete('http://localhost:8000/clients/' + id);
  }

  updateDependents(id: string, payload: CustomerPayload) {
    return this.httpClient.put<CustomerModel>('http://localhost:8000/clients/' + id, payload);
  }

  saveDependents(id: string, payload: DependentsPayload) {
    return this.httpClient.post<DependentsModel>('http://localhost:8000/clients/members/' + id + '/dependents', payload);
  }

  desactiveCustomer(id: string) {
    return this.httpClient.post('http://localhost:8000/clients/' + id + '/deactivate', '');
  }

  reactiveCustomer(id: string) {
    return this.httpClient.post('http://localhost:8000/clients/' + id + '/reactivate', '');
  }
}
